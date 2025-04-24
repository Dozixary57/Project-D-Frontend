import React, { 
  ReactNode, 
  useRef, 
  useEffect, 
  cloneElement, 
  ReactElement, 
  useCallback, 
} from 'react'; 
 
interface ParallaxWrapperProps { 
  children: ReactNode; 
  strength?: number; 
  reverse?: boolean;
  tiltStrength?: number;
} 
 
const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ 
  children, 
  strength = 1, 
  reverse = false,
  tiltStrength = 0,
}) => { 
  const wrapperRef = useRef<HTMLDivElement>(null); 
  const elementsRef = useRef<Array<HTMLElement | null>>([]); 
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 }); 
  const animationFrameRef = useRef<number>(); 
 
  const updateParallax = useCallback(() => { 
    const wrapper = wrapperRef.current; 
    if (!wrapper) return; 
 
    const { x: mouseX, y: mouseY } = mousePosRef.current; 
    const wrapperRect = wrapper.getBoundingClientRect(); 
    const direction = reverse ? -1 : 1; 
    
    const relativeX = ((mouseX - wrapperRect.left) / wrapperRect.width) * 2 - 1;
    const relativeY = ((mouseY - wrapperRect.top) / wrapperRect.height) * 2 - 1;
 
    elementsRef.current.forEach((el, i) => { 
      if (!el) return; 
 
      const rect = el.getBoundingClientRect(); 
      const factor = (60 + i * 20) / Math.max(strength, 0.001); 
 
      const offsetX = (mouseX - wrapperRect.left - rect.width / 2) / factor; 
      const offsetY = (mouseY - wrapperRect.top - rect.height / 2) / factor; 
      
      const rotateY = relativeX * tiltStrength;
      const rotateX = -relativeY * tiltStrength;
      
      if (tiltStrength > 0) {
        el.style.transform = `translate3d(${offsetX * direction}px, ${offsetY * direction}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        if (el.parentElement) {
          el.parentElement.style.perspective = '1000px';
          el.style.transformStyle = 'preserve-3d';
        }
      } else {
        el.style.transform = `translate3d(${offsetX * direction}px, ${offsetY * direction}px, 0)`;
      }
    }); 
 
    animationFrameRef.current = requestAnimationFrame(updateParallax); 
  }, [strength, reverse, tiltStrength]); 
 
  useEffect(() => { 
    const handleMouseMove = (e: MouseEvent) => { 
      mousePosRef.current = { x: e.clientX, y: e.clientY }; 
    }; 
 
    window.addEventListener('mousemove', handleMouseMove); 
    animationFrameRef.current = requestAnimationFrame(updateParallax); 
 
    return () => { 
      window.removeEventListener('mousemove', handleMouseMove); 
      if (animationFrameRef.current) { 
        cancelAnimationFrame(animationFrameRef.current); 
      } 
    }; 
  }, [updateParallax]); 
 
  const wrappedChildren = React.Children.map(children, (child, index) => { 
    if (!React.isValidElement(child)) return null; 
 
    const originalRef = (child as any).ref; 
 
    return cloneElement(child as ReactElement, { 
      ref: (el: HTMLElement) => { 
        elementsRef.current[index] = el; 
 
        if (typeof originalRef === 'function') { 
          originalRef(el); 
        } else if (originalRef && typeof originalRef === 'object') { 
          (originalRef as React.MutableRefObject<HTMLElement | null>).current = el; 
        } 
      }, 
      style: { 
        ...(child.props.style || {}), 
        willChange: 'transform', 
        transform: 'translate3d(0, 0, 0)', 
        transition: 'transform 0.1s ease-out',
      }, 
    }); 
  }); 
 
  return ( 
    <div 
      ref={wrapperRef} 
      style={{ 
        position: 'absolute',
        width: '100%', 
        height: '100%',
        top: 0,
        left: 0,
      }} 
    > 
      {wrappedChildren} 
    </div> 
  ); 
}; 
 
export default ParallaxWrapper;