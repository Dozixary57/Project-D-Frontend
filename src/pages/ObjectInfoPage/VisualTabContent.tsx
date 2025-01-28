import MediaModalWindow, { IMediaModalWindow } from "../../components/ModalWindows/MediaModalWindow";
import { useRef, useState } from "react";
import { GetTitleFromLink } from "../../tools/GetTitleFromLink";
import style from "./VisualTabContent.module.scss";

interface VisualTabContentProps {
  iconUrl: string;
  modelUrl: string;
}

const VisualTabContent = ({ iconUrl, modelUrl }: VisualTabContentProps) => {

  const objectTitle = GetTitleFromLink(iconUrl || modelUrl);

  // MODAL WINDOW
  const MediaModalWindowRef = useRef<IMediaModalWindow | null>(null);
  const openMediaModalWindow = (url: string) => {
    MediaModalWindowRef.current?.open(url);
  }

  const [activeTab, setActiveTab] = useState(1);

  const [loadIconError, setLoadIconError] = useState(false);
  const [loadModelError, setLoadModelError] = useState(false);

  const RenderTabContent = () => {
    switch (activeTab) {
      case 1:
        return iconUrl?.length > 0 && !loadIconError ? (
          <img
            src={iconUrl}
            onClick={() => openMediaModalWindow(iconUrl)}
            alt={`${objectTitle} icon view`}
            onError={() => setLoadIconError(true)}
            className={style.imageAnim}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <img
            src={require("../../images/objects/NoThumbnailObjectIcon.png")}
            alt={`${objectTitle} icon view`}
            style={{ cursor: 'not-allowed' }}
          />
        );
      case 2:
        return modelUrl?.length > 0 && !loadModelError ? (
          <img
            src={modelUrl}
            onClick={() => openMediaModalWindow(modelUrl)}
            alt={`${objectTitle} 3D model view`}
            onError={() => setLoadModelError(true)}
            className={style.imageAnim}
            style={{ cursor: 'pointer' }}
            />
        ) : (
          <img
            src={require("../../images/objects/No3DObjectIcon.png")}
            alt={`${objectTitle} 3D model view`}
            style={{ cursor: 'not-allowed' }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MediaModalWindow ref={MediaModalWindowRef} />
      <div className={style.objectVisualTabs}>
        <button
          className={`${style.objectTabs} ${style.objIconTab} ${activeTab === 1 ? style.objActiveTab : style.objInactiveTab} ${iconUrl?.length > 0 ? '' : style.objUndefinedTab}`}
          onClick={() => setActiveTab(1)}
          title="In-game icon"
        >
          <img src={require('@images/objects/ThumbnailObjectIcon.png')} />
        </button>
        <button
          className={`${style.objectTabs} ${style.objModelTab} ${activeTab === 2 ? style.objActiveTab : style.objInactiveTab} ${modelUrl?.length > 0 ? '' : style.objUndefinedTab}`}
          onClick={() => setActiveTab(2)}
          title="In-game 3D Model"
        >
          <img src={require('@images/objects/3DObjectIcon.png')} />
        </button>
        <div className={style.objectView}>
          <RenderTabContent />
        </div>
      </div>
    </>
  );
};

export default VisualTabContent;