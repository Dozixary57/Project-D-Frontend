import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import "./MediaModalWindow.scss"
import { GetTitleFromLink } from '../../tools/GetTitleFromLink';

export interface IMediaModalWindow {
  open: (link: string) => void;
}

const MediaModalWindow = forwardRef<IMediaModalWindow>((props, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [link, setLink] = React.useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    open: (link: string) => {
      setLink(link);
      setIsVisible(true);
      console.log('MediaModalWindow opened');
    }
  }));

  return isVisible && link ? (
    <div className='ModalWindowLayout' onClick={() => setIsVisible(false)}>
      <div className='ModalWindowContent' onClick={(e) => e.stopPropagation()}>
        <img src={link} alt={GetTitleFromLink(link)} />
      </div>
    </div>
  ) : null;
});

export default MediaModalWindow;