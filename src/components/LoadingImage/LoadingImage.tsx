import React, { useEffect, useRef } from 'react';
import dataLoadingSprite from "../../images/DataLoadingSprite.webp";

const LoadingImage = () => {
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                if (imgRef.current) {
                    imgRef.current.src = '';
                    imgRef.current.src = dataLoadingSprite;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return <img ref={imgRef} src={dataLoadingSprite} alt="Loading..." />;
};

export default LoadingImage;