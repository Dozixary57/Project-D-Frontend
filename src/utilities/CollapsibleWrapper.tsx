import React, { useEffect, useRef, useState } from 'react';

interface CollapsibleWrapperProps {
  isOpen: boolean;
  children: React.ReactNode;
  duration?: number;
  classes?: string;
}

const CollapsibleWrapper: React.FC<CollapsibleWrapperProps> = ({
  isOpen,
  children,
  duration = 300,
  classes,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');
  const [overflow, setOverflow] = useState<'hidden' | 'visible'>('hidden');

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setMaxHeight(isOpen ? `${scrollHeight}px` : '0px');

      if (isOpen) {
        const timeout = setTimeout(() => {
          setOverflow('visible');
        }, duration);

        return () => clearTimeout(timeout);
      } else {
        setOverflow('hidden');
      }
    }
  }, [isOpen, children, duration]);

  const transitionStyle: React.CSSProperties = {
    maxHeight: maxHeight,
    overflow: overflow,
    transition: `max-height ${duration}ms ease`,
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