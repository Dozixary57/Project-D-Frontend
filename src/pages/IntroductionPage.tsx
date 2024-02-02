import { Link } from "react-router-dom";
import "./IntroductionPage.scss";
import { Helmet } from "react-helmet-async";
import { Slider } from "../components/elements/slider/Slider";
import {useEffect, useState} from "react";
import { HomePage } from "./HomePage";
import { ToTopArrow } from "../components/ToUpArrow/ToTopArrow";

const IntroductionPage = () => {

    const [time, setTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const _time = new Date();
            const secondsSinceMidnight = _time.getHours() * 3600 + _time.getMinutes() * 60 + _time.getSeconds();
            setTime(parseFloat((secondsSinceMidnight / 86399 * 24).toFixed(2)));
        }, 1000);

        // Очистка при размонтировании компонента
        return () => {
            clearInterval(timer);
        };
    }, []);
    useEffect(() => {
        // document.documentElement.style.setProperty('--time-value', `${time}em`);
        console.log(time)
    }, [time]);

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            document.documentElement.style.setProperty('--scroll-position', `${window.scrollY}px`);        
            document.documentElement.style.setProperty('--scroll-value', `${window.scrollY}%`);
        };
        window.addEventListener('scroll', handleScroll);

        // Очистка при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth = window.innerWidth;
            document.documentElement.style.setProperty('--viewport-width', `${viewportWidth}px`);
            console.log(viewportWidth)
        };
        window.addEventListener('resize', handleResize);
    
        // Установка начального значения
        handleResize();
    
        // Очистка при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Introduction | Project D</title>
            </Helmet>
            <ToTopArrow />
            <main className="INTRODUCTION_PAGE">
                {/* <p>{time}</p> */}
                <div className="BackgroundClouds">
                    {/* <img src={require('../images/Backgrounds/BackgroundClouds.png')} alt="BackgroundClouds" /> */}
                </div>
                <div className="MoreDetailsTitle">
                    <img src={require('../images/ArrowDown.png')} alt="ArrowDown" />
                    <p>More details</p>
                </div>
                <div className="CentralScreen">
                    <div className="IntroductionDescription">
                        <div className="IntroductionDescriptionText">
                            <p>Исследуйте загадочную планету в захватывающей игре о выживании. Оснащенный модульным технологичным костюмом, ваш герой сталкивается с необузданными природными стихиями и таинственными обитателями этого неприветливого мира. Ваша цель - выживать каждый день, искать ресурсы и путь обратно на Землю. Готовьтесь к увлекательному приключению полному опасностей и открытий!</p>
                            <Link to="/Home">
                                <button>
                                    Home
                                </button>
                            </Link>
                            <Link to="/Receive">
                                <button>
                                    Receive
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="IntroductionDescriptionMedia">
                        <div className="MediaSlider">
                            {/* <img src={require('../images/Backgrounds/BackgroundSky.png')} /> */}
                            <div className="MediaSliderContent">
                                
                            </div>    
                        </div>
                        <div className="MediaFeed">

                        </div>
                    </div>
                </div>
                <div className="DescriptionScreen">
                    {/* <p>75</p> */}
                </div>
            </main>
        </>
    )
}

export { IntroductionPage };