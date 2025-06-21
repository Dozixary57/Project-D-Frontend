import { useEffect, useRef } from 'react';
import loadingSprite from "@images/icons/LoadingSpriteDots.webp";

const LoadingSpriteDots = ({ width = "100%", height = "100%" }: { width?: string, height?: string }) => {

  return (
    <div style={{
      width: width,
      height: height,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflowY: 'hidden',
    }}>
      <img
        src={loadingSprite}
        alt="Loading dots sprite"
        style={{
          width: '100%',
          aspectRatio: '1/1',
          filter: 'invert(73%) sepia(0%) saturate(2455%) hue-rotate(195deg) brightness(93%) contrast(89%)'
        }}
      />
    </div>
  );
};

export default LoadingSpriteDots;