import { useEffect, useRef } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import PageHelmet from "@components/PageHelmet/PageHelmet";
import styles from "./ContentModalWindow.module.scss";

const ContentModalWindow = () => {
  const navigate = useNavigate();

  const { titleId } = useParams<{ titleId: string }>();

  const overlayContentHeightRef = useRef<HTMLDivElement | null>(null);
  document.documentElement.style.setProperty('--overlay-content-height', `0px`);

  useEffect(() => {
    if (overlayContentHeightRef.current) {
      const height = overlayContentHeightRef.current.scrollHeight;
      document.documentElement.style.setProperty('--overlay-content-height', `${height}px`);
    }
    return () => {
      document.documentElement.style.setProperty('--overlay-content-height', `auto`);
    };
  }, [overlayContentHeightRef]);

  return (
    <>
      <PageHelmet title={titleId ? titleId : "Idea of the Project"} />
      <div className={styles.CONTENT_MODAL_WINDOW} onClick={() => navigate(-1)}>
        <div className={styles.MODAL_WINDOW_LAYOUT}>
          <hr />
          <Outlet />
          {/* <div className="MODAL_WINDOW_CONTENT">
            <Outlet />
          </div> */}
          <hr />
        </div>
      </div>
    </>
  )
}

export default ContentModalWindow;