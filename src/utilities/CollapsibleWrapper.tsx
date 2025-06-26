import React, { useEffect, useRef, useState } from 'react';

interface CollapsibleWrapperProps {
  type?: 'horizontal' | 'vertical';
  isOpen: boolean;
  children: React.ReactNode;
  duration?: number;
  classes?: string;
}

const CollapsibleWrapper: React.FC<CollapsibleWrapperProps> = ({
  type = 'vertical',
  isOpen,
  children,
  duration = 300,
  classes,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxSize, setMaxSize] = useState<string>('0px');
  const [overflow, setOverflow] = useState<'hidden' | 'visible'>('hidden');

  useEffect(() => {
    if (contentRef.current) {
      const scrollSize = type === 'vertical' ? contentRef.current.scrollHeight : contentRef.current.scrollWidth;
      setMaxSize(isOpen ? `${scrollSize}px` : '0px');

      if (isOpen) {
        const timeout = setTimeout(() => {
          setOverflow('visible');
        }, duration);

        return () => clearTimeout(timeout);
      } else {
        setOverflow('hidden');
      }
    }
  }, [isOpen, children, duration, type]);

  const transitionStyle: React.CSSProperties =
    type === 'vertical'
      ? {
        maxHeight: maxSize,
        overflow,
        transition: `max-height ${duration}ms ease`,
      }
      : {
        maxWidth: maxSize,
        overflow,
        transition: `max-width ${duration}ms ease`,
        whiteSpace: 'nowrap',
      };

  return (
    <div style={transitionStyle}>
      <div ref={contentRef} className={classes}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleWrapper;