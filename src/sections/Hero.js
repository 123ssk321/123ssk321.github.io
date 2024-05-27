import * as React from "react";

export default function Hero() {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            
            srcSet="../../public/logo192.png"
            className="img"
          />
        </div>
      </div>
      <style jsx>{`
        .div {
          align-items: center;
          display: flex;
          justify-content: center;
          padding: 60px;
        }
        @media (max-width: 991px) {
          .div {
            padding: 0 20px;
          }
        }
        .div-2 {
          justify-content: center;
          display: flex;
          width: 100%;
          max-width: 1280px;
          flex-direction: column;
          padding: 0 32px;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .img {
          aspect-ratio: 1.96;
          object-fit: auto;
          object-position: center;
          width: 100%;
          z-index: 10;
          margin-bottom: -28px;
        }
        @media (max-width: 991px) {
          .img {
            max-width: 100%;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </>
  );
}


