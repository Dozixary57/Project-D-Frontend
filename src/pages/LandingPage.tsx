import { Link } from "react-router-dom";
import "./LandingPage.scss";
import { Helmet } from "react-helmet";
import { Slider } from "../components/elements/slider/Slider";
import {useEffect, useState} from "react";
// import {flushSync} from "react-dom";

const LandingPage = () => {

    // const [introductionView, setIntroductionView ] = useState(true);

    const [introStyles, setIntroStyles ] = useState<boolean>(true);
    const [descStyles, setDescStyles ] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('popstate', handler);
        return () => {
            window.removeEventListener('popstate', handler);
        };
    }, []);

    function handler(event: any) {
        event.preventDefault()
        viewsChanger()
    }
    function viewsChanger() : void {
        document.body.style.overflow = 'hidden'
        if (introStyles) {
            let descViewElem = document.getElementsByClassName('descriptionMain');
            for (let i = 0; i < descViewElem.length; i++) {
                let element = descViewElem[i] as HTMLElement;
                element.style.maxWidth = 'calc(100vw - 1.8vw)';
                element.style.maxHeight = '100%';
                element.style.scale = '1';
            }
            setDescStyles(true)
            setIntroStyles(false)
            setTimeout(() => {
                let intoViewElem = document.getElementsByClassName('introductionMain');
                for (let i = 0; i < intoViewElem.length; i++) {
                    let element = intoViewElem[i] as HTMLElement;
                    element.style.maxWidth = '0';
                    element.style.maxHeight = '0';
                    element.style.scale = '0';

                }
            }, 1000)
        }
        if (descStyles) {
            let intoViewElem = document.getElementsByClassName('introductionMain');
            for (let i = 0; i < intoViewElem.length; i++) {
                let element = intoViewElem[i] as HTMLElement;
                element.style.maxWidth = '100%';
                element.style.maxHeight = '100%';
                element.style.scale = '1';

            }
            setIntroStyles(true)
            setDescStyles(false)
            setTimeout(() => {
                let descViewElem = document.getElementsByClassName('descriptionMain');
                for (let i = 0; i < descViewElem.length; i++) {
                    let element = descViewElem[i] as HTMLElement;
                    element.style.maxWidth = '0';
                    element.style.maxHeight = '0';
                    element.style.scale = '0';
                }
            }, 1000)
        }
        setTimeout(() => {
            document.body.style.overflow = 'initial'
        }, 1000)
    }



    return (
        <>
            {introStyles?
                (<Helmet>
                    <meta charSet="utf-8" />
                    <title>Introduction | Project D</title>
                </Helmet>)
                :
                (<Helmet>
                    <meta charSet="utf-8" />
                    <title>Description | Project D</title>
                </Helmet>)
            }
            <main className="landingMain">
                <div className="introductionMain" style={!descStyles? {translate: '0'} : {translate: '0 -100vh'}}>
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
                                    <img src={require('../components/images/ThePlagueDoctor.png')}/>
                                </div>
                            </section>
                            <section>
                                <div>
                                    <h1>Умения</h1>
                                    <p>wqekmcxks wkcmk kwm km kw mkm km km kerm km k</p>
                                </div>
                                <div>
                                    <img src={require('../components/images/ThePlagueDoctor.png')}/>
                                </div>
                            </section>
                            <section>
                                <div>
                                    <h1>Умения</h1>
                                    <p>wqekmcxks wkcmk kwm km kw mkm km km kerm km k</p>
                                </div>
                                <div>
                                    <img src={require('../components/images/ThePlagueDoctor.png')}/>
                                </div>
                            </section>
                            <p style={{marginTop: '100em'}}>cw</p>
                            <p>cw</p>
                            <p>cw</p>
                            <p>cw</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export { LandingPage };