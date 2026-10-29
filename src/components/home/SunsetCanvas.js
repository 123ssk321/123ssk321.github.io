import React, { useCallback, useEffect, useRef, useState } from 'react';

const DARK_IMAGE_SRC = '/images/neon-shore-v3.webp';
const LIGHT_IMAGE_SRC = '/images/neon-shore-light-v4.webp';
const IMAGE_ZOOM = 1.35;
const MAX_DPR = 1.25;
const MAX_DESKTOP_WIDTH = 1100;
const MAX_MOBILE_WIDTH = 660;
const FRAME_INTERVAL = 1000 / 30;

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uImage;
  uniform vec2 uCover;
  uniform vec2 uCoverOffset;
  uniform float uImageAspect;
  uniform float uViewportAspect;
  uniform float uSunDrift;
  uniform float uTime;
  uniform float uMotion;
  uniform vec2 uPointer;
  uniform float uRippleTime;

  float smoothMask(float edgeA, float edgeB, float value) {
    return smoothstep(edgeA, edgeB, value);
  }

  void main() {
    vec2 imageUv = (vUv - 0.5) * uCover + 0.5 + uCoverOffset;
    float topDown = 1.0 - imageUv.y;
    float waterDepth = smoothMask(0.598, 0.622, topDown);
    float depth = clamp((topDown - 0.61) / 0.17, 0.0, 1.0);
    float inletHalfWidth = mix(0.22, 0.52, depth);
    float inlet = smoothMask(0.0, 0.024, inletHalfWidth - abs(imageUv.x - 0.5));
    float water = waterDepth * inlet;

    vec2 sunDelta = vec2((imageUv.x - 0.5) * uImageAspect, imageUv.y - 0.52);
    float sunDistance = length(sunDelta);
    float sunRegion = 1.0 - smoothstep(0.205, 0.245, sunDistance);
    imageUv.y += sin(uTime * 0.58) * uSunDrift * sunRegion * uMotion;

    vec2 displacedUv = imageUv;
    float wave = sin(imageUv.y * 190.0 - uTime * 1.7 + sin(imageUv.x * 23.0) * 1.5);
    float crossingWave = sin(imageUv.x * 34.0 + imageUv.y * 115.0 + uTime * 0.75);
    displacedUv.x += water * uMotion * wave * 0.0016;
    displacedUv.y += water * uMotion * crossingWave * 0.0011;

    vec4 color = texture2D(uImage, displacedUv);
    float laneWidth = mix(0.045, 0.19, depth);
    float lane = exp(-pow((imageUv.x - 0.5) / laneWidth, 2.0));
    float ripplePhase = imageUv.y * 250.0 - uTime * 2.2 + sin(imageUv.x * 18.0) * 1.2;
    float ambientRipples = pow(max(0.0, sin(ripplePhase)), 16.0) * (0.2 + 0.42 * lane) * water * uMotion;
    vec2 screenPointer = vec2(vUv.x, 1.0 - vUv.y);
    vec2 rippleDelta = (screenPointer - uPointer) * vec2(uViewportAspect, 1.0);
    float rippleDistance = length(rippleDelta);
    float rippleAge = max(uRippleTime, 0.0);
    float rippleEnvelope = exp(-rippleAge * 1.65) * (1.0 - smoothstep(1.35, 1.8, rippleAge));
    float pointerRipple = exp(-pow((rippleDistance - rippleAge * 0.34) / 0.012, 2.0)) * rippleEnvelope;
    pointerRipple += exp(-pow((rippleDistance - rippleAge * 0.21 - 0.025) / 0.009, 2.0)) * rippleEnvelope * 0.48;
    float ripples = ambientRipples + pointerRipple * water * (0.55 + lane * 0.75);
    float lowSheen = (0.5 + 0.5 * sin(imageUv.y * 72.0 - uTime * 0.7 + imageUv.x * 9.0))
                   * lane * water * uMotion * 0.045;
    color.rgb += vec3(0.12, 0.68, 0.88) * (ripples + lowSheen * 0.42);
    color.rgb += vec3(0.9, 0.24, 0.55) * (ambientRipples * lane * 0.2 + pointerRipple * water * 0.12);

    float sunField = exp(-pow(sunDistance / 0.2, 2.0));
    float breath = (0.5 + 0.5 * sin(uTime * 0.42)) * uMotion;
    float corona = exp(-pow(sunDistance / 0.19, 2.0)) * (0.035 + breath * 0.055);
    color.rgb += vec3(1.0, 0.23, 0.43) * corona;

    gl_FragColor = color;
  }
`;

const compileShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message || 'Unable to compile sunset shader');
  }
  return shader;
};

const createProgram = (gl) => {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(message || 'Unable to link sunset shader');
  }
  return program;
};

const SunsetCanvas = ({ theme, isMotionActive, interactionRef }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const animationRef = useRef(0);
  const [loadedImageSrc, setLoadedImageSrc] = useState(null);
  const [contextVersion, setContextVersion] = useState(0);
  const imageSrc = theme === 'light' ? LIGHT_IMAGE_SRC : DARK_IMAGE_SRC;
  const imageReady = loadedImageSrc === imageSrc;

  const markImageReady = useCallback(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoadedImageSrc(imageSrc);
  }, [imageSrc]);

  useEffect(() => {
    markImageReady();
  }, [markImageReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !imageReady || !image?.naturalWidth) return undefined;

    let gl;
    let program;
    let texture;
    let buffer;
    let resizeObserver;
    let disposed = false;
    let lastFrameTime = -FRAME_INTERVAL;
    let startTime = performance.now();
    const uniforms = {};
    let coverUniform;
    let imageAspectUniform;
    let sunDriftUniform;
    let timeUniform;
    let motionUniform;
    let pointerUniform;
    let rippleTimeUniform;
    let coverOffsetUniform;
    let viewportAspectUniform;
    let wakeRender;
    const activeInteraction = interactionRef?.current;

    const setCanvasUnavailable = () => {
      canvas.dataset.ready = 'false';
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    };

    const onContextLost = (event) => {
      event.preventDefault();
      setCanvasUnavailable();
    };

    const onContextRestored = () => {
      canvas.dataset.ready = 'false';
      setContextVersion((version) => version + 1);
    };

    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);

    try {
      gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      });
      if (!gl) return () => {
        canvas.removeEventListener('webglcontextlost', onContextLost);
        canvas.removeEventListener('webglcontextrestored', onContextRestored);
      };

      program = createProgram(gl);
      texture = gl.createTexture();
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      gl.useProgram(program);
      const position = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      uniforms.image = gl.getUniformLocation(program, 'uImage');
      coverUniform = gl.getUniformLocation(program, 'uCover');
      coverOffsetUniform = gl.getUniformLocation(program, 'uCoverOffset');
      imageAspectUniform = gl.getUniformLocation(program, 'uImageAspect');
      viewportAspectUniform = gl.getUniformLocation(program, 'uViewportAspect');
      sunDriftUniform = gl.getUniformLocation(program, 'uSunDrift');
      timeUniform = gl.getUniformLocation(program, 'uTime');
      motionUniform = gl.getUniformLocation(program, 'uMotion');
      pointerUniform = gl.getUniformLocation(program, 'uPointer');
      rippleTimeUniform = gl.getUniformLocation(program, 'uRippleTime');
      gl.uniform1i(uniforms.image, 0);
      gl.uniform1f(imageAspectUniform, image.naturalWidth / image.naturalHeight);
      gl.activeTexture(gl.TEXTURE0);

      let render = () => {};
      const resize = () => {
        if (!gl || disposed) return;
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const maxWidth = window.innerWidth <= 768 ? MAX_MOBILE_WIDTH : MAX_DESKTOP_WIDTH;
        const scale = Math.min(MAX_DPR, maxWidth / rect.width, 1.25);
        const width = Math.max(1, Math.round(rect.width * scale));
        const height = Math.max(1, Math.round(rect.height * scale));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
        const viewportAspect = rect.width / rect.height;
        const imageAspect = image.naturalWidth / image.naturalHeight;
        gl.uniform1f(viewportAspectUniform, viewportAspect);
        const baseCoverX = viewportAspect < imageAspect ? viewportAspect / imageAspect : 1;
        const baseCoverY = viewportAspect > imageAspect ? imageAspect / viewportAspect : 1;
        const coverX = baseCoverX / IMAGE_ZOOM;
        const coverY = baseCoverY / IMAGE_ZOOM;
        gl.uniform2f(coverUniform, coverX, coverY);
        const originX = window.innerWidth <= 768 ? 0.5 : 0;
        const originY = 0.3;
        gl.uniform2f(
          coverOffsetUniform,
          (originX - 0.5) * baseCoverX * (1 - 1 / IMAGE_ZOOM),
          (originY - 0.5) * baseCoverY * (1 - 1 / IMAGE_ZOOM),
        );
        gl.uniform1f(sunDriftUniform, 4 / (rect.height / coverY));
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame((now) => render(now, true));
      };

      render = (now, force = false) => {
        if (disposed || !gl) return;
        const elapsed = now - lastFrameTime;
        if (force || elapsed >= FRAME_INTERVAL - 0.5) {
          lastFrameTime = now;
          gl.uniform1f(timeUniform, (now - startTime) / 1000);
          const interaction = interactionRef?.current;
          const rippleAge = interaction ? (now / 1000) - interaction.time : 10;
          gl.uniform1f(motionUniform, isMotionActive ? 1 : 0);
          gl.uniform2f(pointerUniform, interaction?.x ?? 0.5, interaction?.y ?? 0.65);
          gl.uniform1f(rippleTimeUniform, rippleAge);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          canvas.dataset.ready = 'true';
        }
        if (isMotionActive) animationRef.current = requestAnimationFrame(render);
        else animationRef.current = 0;
      };

      wakeRender = () => {
        if (!animationRef.current && !disposed) animationRef.current = requestAnimationFrame(render);
      };
      if (activeInteraction) activeInteraction.wake = wakeRender;

      resize();
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
      }
      window.addEventListener('resize', resize, { passive: true });
      return () => {
        disposed = true;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        resizeObserver?.disconnect();
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        canvas.removeEventListener('webglcontextrestored', onContextRestored);
        if (activeInteraction?.wake === wakeRender) activeInteraction.wake = undefined;
        if (gl && !gl.isContextLost()) {
          if (buffer) gl.deleteBuffer(buffer);
          if (texture) gl.deleteTexture(texture);
          if (program) gl.deleteProgram(program);
        }
        canvas.dataset.ready = 'false';
      };
    } catch (error) {
      setCanvasUnavailable();
      if (gl && !gl.isContextLost()) {
        if (buffer) gl.deleteBuffer(buffer);
        if (texture) gl.deleteTexture(texture);
        if (program) gl.deleteProgram(program);
      }
      return () => {
        canvas.removeEventListener('webglcontextlost', onContextLost);
        canvas.removeEventListener('webglcontextrestored', onContextRestored);
        if (activeInteraction?.wake === wakeRender) activeInteraction.wake = undefined;
      };
    }
  }, [imageReady, imageSrc, interactionRef, isMotionActive, contextVersion]);

  return (
    <>
      <img
        key={imageSrc}
        ref={imageRef}
        src={imageSrc}
        alt=''
        aria-hidden='true'
        onLoad={markImageReady}
        onError={() => setLoadedImageSrc(null)}
        draggable='false'
      />
      <canvas ref={canvasRef} data-ready='false' />
    </>
  );
};

export default SunsetCanvas;
