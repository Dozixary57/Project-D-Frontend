import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./CellContent.scss";

interface Data {
  title?: string;
  image?: string;
  link?: string;
  style?: React.CSSProperties;
}

const LinkWrapper = ({ children, link }: { children: React.ReactNode, link?: string }) => {
  return link ? (
    <Link to={link}>
      {children}
    </Link>
  ) : (
    <>
      {children}
    </>
  );
};

const CellContent = ({
  title,
  data = [],
  transitionInterval = 5,
  transitionDelay = 3,
  withControl = false,
  customCSSVariables,
  onClick,
  className
}: {
  title?: string;
  data?: Data[];
  transitionInterval?: number;
  transitionDelay?: number;
  withControl?: boolean;
  customCSSVariables?: Record<string, string>;
  onClick?: () => void;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const delayRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef(false);

  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    data.forEach(item => {
      const imageSrc = item.image;
      if (imageSrc && !imageCache.current.has(imageSrc)) {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          imageCache.current.set(imageSrc, img);
        };
      }
    });
  }, [data]);

  const forceAnimationReset = () => {
    setTransitionKey(prevKey => prevKey + 1);

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    isTransitioningRef.current = false;
    setIsTransitioning(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioningRef.current = true;
        setIsTransitioning(true);

        transitionTimeoutRef.current = setTimeout(() => {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }, 500);
      });
    });
  };

  const autoChangeSlide = () => {
    if (delayRef.current || isTransitioningRef.current || data.length <= 1) return;

    const nextIndex = (currentIndex + 1) % data.length;
    const nextImage = data[nextIndex]?.image;

    if (nextImage && !imageCache.current.has(nextImage)) {
      const img = new Image();
      img.src = nextImage;
      img.onload = () => {
        imageCache.current.set(nextImage, img);
        proceedWithTransition(nextIndex);
      };
    } else {
      proceedWithTransition(nextIndex);
    }
  };

  const proceedWithTransition = (nextIndex: number) => {
    setDirection('right');
    setPrevIndex(currentIndex);
    setCurrentIndex(nextIndex);
    forceAnimationReset();
  };

  const handleManualTransition = (newIndex: number) => {
    if (newIndex === currentIndex || isTransitioningRef.current) {
      return;
    }

    const nextImage = data[newIndex]?.image;

    if (nextImage && !imageCache.current.has(nextImage)) {
      const img = new Image();
      img.src = nextImage;
      img.onload = () => {
        imageCache.current.set(nextImage, img);
        proceedWithManualChange(newIndex);
      };
    } else {
      proceedWithManualChange(newIndex);
    }
  };

  const proceedWithManualChange = (newIndex: number) => {
    if (newIndex > currentIndex) {
      setDirection('right');
    } else {
      setDirection('left');
    }

    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
    forceAnimationReset();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    delayRef.current = true;
    timeoutRef.current = setTimeout(() => {
      delayRef.current = false;
    }, transitionInterval * transitionDelay * 1000);
  };

  const handleButtonClick = (index: number) => {
    handleManualTransition(index);
  };

  useEffect(() => {
    if (data.length <= 1) return;

    intervalRef.current = setInterval(autoChangeSlide, transitionInterval * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data.length, currentIndex, transitionInterval]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const currentData = data[currentIndex];
  const prevData = data[prevIndex];


  const showcaseStyleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showcaseStyleRef.current && customCSSVariables) {
      Object.entries(customCSSVariables).forEach(([key, value]) => {
        showcaseStyleRef.current?.style.setProperty(key, `"${value}"`);
      });
    }
  }, [customCSSVariables]);

  return (
    <div className={`ShowcaseCell ${className || ''}`} ref={showcaseStyleRef} onClick={onClick}>
      <LinkWrapper link={currentData?.link}>
        {currentData?.title && <p className="DataTitle">{currentData.title}</p>}
        <div className="CellContent" key={transitionKey}>
          {currentData?.image && <img
            src={currentData?.image ?? require('@images/main_showcase/StandBy.png')}
            alt={title || ""}
            style={{
              ...currentData?.style,
              zIndex: 1
            }}
            className={`CellImage current ${isTransitioning ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}
          />}

          {isTransitioning && prevData && (
            <img
              src={prevData?.image ?? require('@images/main_showcase/StandBy.png')}
              alt={title || ""}
              style={{
                ...prevData?.style,
                zIndex: 0
              }}
              className={`CellImage prev ${direction === 'right' ? 'slide-out-left' : 'slide-out-right'}`}
            />
          )}
        </div>
        {title && <p className="CellTitle">{title}</p>}
      </LinkWrapper>

      {withControl && data.length > 1 && (
        <div className="CellControls">
          {data.map((_, index) => (
            <button
              key={index}
              className={`ControlButton ${index === currentIndex ? 'active' : 'inactive'}`}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CellContent;