import * as React from "react";

export default function Navbar() {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f466301822a0123570d734f3426582db3ce0c4a1b0ec60a9a706683165bdfdcc?"
            className="img"
          />
          <div className="div-3">Personal</div>
        </div>
        <div className="div-4">
          <div className="div-5">About Me</div>
          <div className="div-6">Skills</div>
          <div className="div-7">Project</div>
          <div className="div-8">Contact me</div>
        </div>
        <div className="div-9">
          <div className="div-10">Resume</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d68e0b508cb674652e50eeb888851b903292815d4d698a7ced624352c317d75a?"
            className="img-2"
          />
        </div>
      </div>
      <style jsx>{`
        .div {
          justify-content: space-between;
          align-items: center;
          display: flex;
          gap: 20px;
          font-size: 20px;
          color: var(--Primary-Black, #000);
          font-weight: 600;
          letter-spacing: -0.4px;
          line-height: 120%;
          padding: 0 32px;
        }
        @media (max-width: 991px) {
          .div {
            flex-wrap: wrap;
            padding: 0 20px;
          }
        }
        .div-2 {
          align-self: stretch;
          display: flex;
          gap: 12px;
          font-weight: 700;
          white-space: nowrap;
          text-transform: capitalize;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-2 {
            white-space: initial;
          }
        }
        .img {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 40px;
        }
        .div-3 {
          font-family: Sora, sans-serif;
          margin: auto 0;
        }
        .div-4 {
          justify-content: center;
          align-self: stretch;
          display: flex;
          gap: 20px;
          text-transform: capitalize;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-4 {
            flex-wrap: wrap;
          }
        }
        .div-5 {
          font-family: Sora, sans-serif;
        }
        .div-6 {
          font-family: Sora, sans-serif;
        }
        .div-7 {
          font-family: Sora, sans-serif;
        }
        .div-8 {
          font-family: Sora, sans-serif;
        }
        .div-9 {
          justify-content: center;
          border-radius: 4px;
          background-color: var(--Primary-Black, #000);
          align-self: stretch;
          display: flex;
          gap: 8px;
          color: var(--Primary-White, #fff);
          white-space: nowrap;
          letter-spacing: 0.4px;
          padding: 16px 20px;
        }
        @media (max-width: 991px) {
          .div-9 {
            white-space: initial;
          }
        }
        .div-10 {
          font-family: Sora, sans-serif;
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
          margin: auto 0;
        }
      `}</style>
    </>
  );
}


