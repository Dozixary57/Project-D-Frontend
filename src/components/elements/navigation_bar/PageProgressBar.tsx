import React, { useEffect, useState } from 'react';

const styles = {
    container: {
        position: "fixed",
        height: "0.5em",

    }
};

const PageProgressBar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrollable, setIsScrollable] = useState(false);

    const handleScroll = () => {
        setIsScrollable(document.documentElement.scrollHeight > window.innerHeight);
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight}`;

        setScrollPosition(Number(scroll));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isScrollable) {
        return null;
    }

    return (
        <div style={{position: "fixed", width: "100%", height: '0.2em', top: "0" , left: "0", right: "0", zIndex: "5" }}>
            <div style={{ width: `${scrollPosition * 100}%`, height: "100%", backgroundColor: "#AAA", clipPath: "polygon(0 0, 100% 0, 100% 0%, 98.8vw 100%, 0% 100%, 0.4vw 100%)", transition: "all 0.15s linear" }} />
        </div>
    );
};

export default PageProgressBar;