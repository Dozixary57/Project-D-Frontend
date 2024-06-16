import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import "./ModalWindow1.scss"

export interface OpenModalWindow {
    open: (link: string) => void;
}

const ModalWindow = forwardRef<OpenModalWindow>((props, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [link, setLink] = React.useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        open: (link: string) => {
            setLink(link);
            setIsVisible(true);
        }
    }));

    return isVisible && link ? (
        <div className='ModalWindowLayout' onClick={() => setIsVisible(false)}>
            <div className='ModalWindowContent'>
                <img src={link} alt={link.split('/').pop()?.split('.').slice(0, -1).join('.')} />
            </div>
        </div>
    ) : null;
});

export default ModalWindow;