import { Link } from "react-router-dom";
import "./IntroductionPage.scss";
import { Helmet } from "react-helmet";
import { Slider } from "../components/elements/slider/Slider";
import {useEffect, useState} from "react";

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

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Introduction | Project D</title>
            </Helmet>
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
                                        {/* <div className="IntroductionDescription">
                        <p>Исследуйте загадочную планету в захватывающей игре о выживании. Оснащенный модульным технологичным костюмом, ваш герой сталкивается с необузданными природными стихиями и таинственными обитателями этого неприветливого мира. Ваша цель - выживать каждый день, искать ресурсы и путь обратно на Землю. Готовьтесь к увлекательному приключению полному опасностей и открытий!</p>
                    </div> */}

                </div>
                <div className="DescriptionScreen">
                    {/* <p>75</p> */}
                </div>
                {/* <div className="introductionMain" style={!descStyles? {translate: '0'} : {translate: '0 -100vh'}}>
                    <div className="introBox">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className="buttonsContainer">
                            <Link to="/">
                                <button onClick={() => {
                                    viewsChanger()
                                    window.history.pushState({}, '', '/');
                                }}>Подробнее</button>
                            </Link>
                            <Link to="/Home">
                                <button style={{whiteSpace: 'normal', width: 'auto'}}>
                                    Начать приключение
                                </button>
                            </Link>
                            <Link to="/Receive">
                                <button>Получить</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="descriptionMain" style={!introStyles? {translate: '0'} : {translate: '0 100vh'}}>
                    <div className="descriptionContentMain">
                        <div className="backButtonContainer">
                            <button onClick={() => {
                                viewsChanger()
                                window.history.pushState({}, '', '/');
                            }} className="backButton">Вернуться</button>
                        </div>
                        <div style={{marginTop: '3em'}}>
                            <Slider />
                            <section>
                                <div>
                                    <h1>Умения</h1>
                                    <p>wqekmcxks wkcmk kwm km kw mkm km km kerm km k</p>
                                </div>
                                <div>
                                    <img src={require('../images/ThePlagueDoctor.png')}/>
                                </div>
                            </section>
                            <section>
                                <div>
                                    <h1>Умения</h1>
                                    <p>wqekmcxks wkcmk kwm km kw mkm km km kerm km k</p>
                                </div>
                                <div>
                                    <img src={require('../images/ThePlagueDoctor.png')}/>
                                </div>
                            </section>
                            <section>
                                <div>
                                    <h1>Умения</h1>
                                    <p>wqekmcxks wkcmk kwm km kw mkm km km kerm km k</p>
                                </div>
                                <div>
                                    <img src={require('../images/ThePlagueDoctor.png')}/>
                                </div>
                            </section>
                            <p style={{marginTop: '100em'}}>cw</p>
                            <p>cw</p>
                            <p>cw</p>
                            <p>cw</p>
                        </div>
                    </div>
                </div> */}
            </main>
        </>
    )
}

export { IntroductionPage };