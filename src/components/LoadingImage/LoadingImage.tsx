import { useEffect, useRef } from 'react';
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

    return (
        <div
        // className='loading-image'
            style={{width: '100%', height: '100%'}}
        >
            <img
                ref={imgRef}
                src={dataLoadingSprite}
                alt="Loading..."
                style={{width: '100%', height: '100%'}}
            />
        </div>
    );
};

export default LoadingImage;