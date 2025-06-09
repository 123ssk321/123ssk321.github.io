import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import TimelineCard from './TimelineCard';

const TimelineContainer = styled.section`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
`;

const BaseLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--color-timeline-base);
  transform: translateX(-50%);
  z-index: 0;

  @media (max-width: 768px) {
    left: 8px; /* matches padding-left + half dot width */
    transform: none;
  }
`;

const FillLine = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 0;
  width: 4px;
  background: var(--color-timeline-fill);
  box-shadow: 0 0 8px var(--color-timeline-fill-shadow);
  transform: translateX(-50%);
  z-index: 1;

  @media (max-width: 768px) {
    left: 8px;
    transform: none;
  }
`;

const Dot = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-timeline-dot);
  transform: translate(-50%, -50%);
  z-index: 2;

  @media (max-width: 768px) {
    left: -4pt; /* same as line */
    transform: translate(
      -50%,
      -50%
    ); /* horizontally center dot over the line */
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  justify-content: ${(props) =>
    props.align === 'left' ? 'flex-start' : 'flex-end'};
  margin-bottom: 4rem;
  z-index: 3;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 40px; /* Add padding to make room for the line and dot */
  }
`;

const CardWrapper = styled(motion.div)`
  max-width: 500px;
  width: 100%;
  @media (max-width: 768px) {
    max-width: calc(100% - 20px);
  }
`;

export default function Timeline({ items, theme, activeTab }) {
  const ref = useRef(null);
  const fillLineRef = useRef(null);
  const dotRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 80%'],
  });

  const [progress, setProgress] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setProgress(v);
  });

  useEffect(() => {
    if (!ref.current || !fillLineRef.current) return;

    const handleScroll = () => {
      const timelineTop = ref.current.getBoundingClientRect().top;
      const fillLength =
        fillLineRef.current.getBoundingClientRect().bottom - timelineTop;
      setFillHeight(fillLength);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <TimelineContainer ref={ref}>
      <BaseLine />
      <FillLine
        ref={fillLineRef}
        style={{
          height: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
        }}
      />

      {items.map((item, idx) => {
        const align = isMobile || idx % 2 === 0 ? 'left' : 'right';
        const dotRef = (el) => (dotRefs.current[idx] = el);

        // Default to false, until dot is reached
        let showCard = false;

        if (dotRefs.current[idx] && fillLineRef.current && ref.current) {
          const timelineTop = ref.current.getBoundingClientRect().top;
          const dotY =
            dotRefs.current[idx].getBoundingClientRect().top - timelineTop;
          showCard = fillHeight >= dotY;
        }

        return (
          <TimelineItem key={item.id} align={align}>
            <Dot
              ref={dotRef}
              animate={{
                backgroundColor: showCard
                  ? 'var(--color-timeline-dot-active)'
                  : 'var(--color-timeline-dot)',
                // you can also tweak the shadow or scale here:
                boxShadow: showCard
                  ? '0 0 12px var(--color-timeline-dot-active-shadow)'
                  : 'none',
              }}
              transition={{ duration: 0.3 }}
            />

            <CardWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: showCard ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <TimelineCard
                item={item}
                theme={theme}
                align={align}
                type={activeTab}
              />
            </CardWrapper>
          </TimelineItem>
        );
      })}
    </TimelineContainer>
  );
}
