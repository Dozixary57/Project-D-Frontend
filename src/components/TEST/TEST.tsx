import React, { useState, useEffect } from "react";
import "./TEST.scss";

const images = [
    {
        src: "https://koketta.ru/wp-content/uploads/3/7/7/377bfd3e6ba28358abbc671eaa3e957c.jpeg",
        type: "image",
    },
    {
        src: "https://koketta.ru/wp-content/uploads/1/5/5/1557b636e6c192e49265b41fc2179599.jpeg",
        type: "image",
    },
    {
        src: "https://kartinkin.net/uploads/posts/2022-12/1669923506_27-kartinkin-net-p-rozovii-frukt-s-shipami-pinterest-30.jpg",
        type: "image",
    },
    {
        src: "https://vsegda-pomnim.com/uploads/posts/2022-04/1651238208_81-vsegda-pomnim-com-p-frukt-drakone-serdtse-foto-89.jpg",
        type: "image",
    },
    {
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        type: "video",
    },
];

function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => {
            if (!paused) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentIndex, paused]);

    useEffect(() => {
        let timer = setTimeout(() => {
            setPaused(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, [paused]);

    const handlePrevClick = () => {
        setPaused(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setPaused(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleIndicatorClick = (index: number) => {
        setPaused(true);
        setCurrentIndex(index);
    };

    const currentSlide = images[currentIndex];


    return (
        <div className="slider-container">
            {currentSlide.type === "image" ? (
                <img src={currentSlide.src} alt="slider" className="slider-image" />
            ) : (
                <video autoPlay muted loop className="slider-video">
                    <source src={currentSlide.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <div className="slider-indicators">
                <button className="slider-btn slider-btn-prev" onClick={handlePrevClick}>
                    {"<"}
                </button>
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={`slider-indicator ${index === currentIndex ? "active" : ""
                            }`}
                        onClick={() => handleIndicatorClick(index)}

                    >{"O"}</button>
                ))}
                <button className="slider-btn slider-btn-next" onClick={handleNextClick}>
                    {">"}
                </button>
            </div>
        </div>
    );
}

export default Slider;