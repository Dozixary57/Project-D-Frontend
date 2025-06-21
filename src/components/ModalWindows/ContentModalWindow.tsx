import { useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./ContentModalWindow.module.scss";

const ContentModalWindow = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  // const overlayContentHeightRef = useRef<HTMLDivElement | null>(null);
  // document.documentElement.style.setProperty('--overlay-content-height', `0px`);

  // useEffect(() => {
  //   if (overlayContentHeightRef.current) {
  //     const height = overlayContentHeightRef.current.scrollHeight;
  //     document.documentElement.style.setProperty('--overlay-content-height', `${height}px`);
  //   }
  //   return () => {
  //     document.documentElement.style.setProperty('--overlay-content-height', `auto`);
  //   };
  // }, [overlayContentHeightRef]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={styles.CONTENT_MODAL_WINDOW} onClick={() => navigate('..')}>
      <hr />
      <div className={styles.MODAL_WINDOW_DATA}
        // ref={overlayContentHeightRef}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <hr />
    </div>
  )
}

export default ContentModalWindow;