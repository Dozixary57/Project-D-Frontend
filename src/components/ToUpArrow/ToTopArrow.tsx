import { useEffect, useRef } from 'react';
import "./ToTopArrow.scss"

const ToTopArrow = () => {
    const scrollingToTop = useRef(false);

    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0 && scrollingToTop.current) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }    
    };

    useEffect(() => {
      // При прокрутке колесика мыши вниз отменяем прокрутку наверх
      const handleScroll = (event: { deltaY: number; }) => {
        if (event.deltaY > 0) {
          scrollingToTop.current = false;
        }
      };

      window.addEventListener('wheel', handleScroll);

      // Удаляем обработчик события при размонтировании компонента
      return () => {
        window.removeEventListener('wheel', handleScroll);
      };
    }, []);

    return(
        <button onClick={() => {scrollingToTop.current = true; scrollToTop();}} className="TO_TOP_ARROW">
            <img src={require('../../images/ArrowDown.png')} alt="ToUpArrow" />
        </button>
    )
}

export { ToTopArrow };