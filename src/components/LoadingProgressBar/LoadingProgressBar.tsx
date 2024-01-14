import React, { useRef, useImperativeHandle, forwardRef } from 'react';

export interface ProgressBarHandle {
    startProgress: () => void;
}

const LoadingProgressBar = forwardRef<ProgressBarHandle>((props, ref) => {
    const [progress, setProgress] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const [offsetY, setOffsetY] = React.useState('0em');

    useImperativeHandle(ref, () => ({
        startProgress: () => {
            setIsVisible(true);
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += 5; // Увеличиваем прогресс на 2% каждые 10 мс
                setProgress(currentProgress);
                if (currentProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setOffsetY('-0.2em'); // Смещаем ProgressBar на -1em по Y
                        setTimeout(() => {
                            setProgress(0);
                            setIsVisible(false);
                            setOffsetY('0em'); // Возвращаем ProgressBar на исходную позицию
                        }, 200); // ProgressBar исчезает через 0.2 секунды после смещения
                    }, 200); // ProgressBar смещается через 0.5 секунды после достижения 100%
                }
            }, 10); // Обновляем прогресс каждые 10 мс
        }
    }));

    return isVisible ? (
        <div style={{position: "fixed", width: "100%", height: '0.2em', top: "0" , left: "0", right: "0", zIndex: "5", transform: `translateY(${offsetY})`, transition: 'transform 0.2s' }}>
            <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#AAA", clipPath: "polygon(0 0, 100% 0, 100% 0%, 98.8vw 100%, 0% 100%, 0.4vw 100%)", transition: "all 0.01s linear" }} />
        </div>
    ) : null;
});

export default LoadingProgressBar;