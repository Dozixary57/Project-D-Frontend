import { useEffect, useRef } from 'react';
import dataLoadingSprite from "../../images/DataLoadingSprite.webp";
import { JumpingLettersEffect } from '../../tools/TextEffectsFormater';

const LoadingImage = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // const handleVisibilityChange = () => {
    //   if (document.visibilityState === 'visible') {
    //     if (imgRef.current) {
    //       imgRef.current.src = '';
    //       imgRef.current.src = dataLoadingSprite;
    //     }
    //   }
    // };

    // document.addEventListener('visibilitychange', handleVisibilityChange);

    // return () => {
    //   document.removeEventListener('visibilitychange', handleVisibilityChange);
    // };
  }, []);

  return (
    <div
      // className='loading-image'
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0em 0 1.5em 0',
      }}
    >
      <img
        ref={imgRef}
        src={dataLoadingSprite}
        alt="Loading..."
        style={{
          width: '14em',
          height: '14em',
          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.35) 30%, rgba(0, 0, 0, 0) 70%)'
        }}
      />
      <JumpingLettersEffect text="Loading..." />
    </div>
  );
};

export default LoadingImage;