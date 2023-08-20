import { Link } from "react-router-dom";
import "./LandingPage.scss";
import { Helmet } from "react-helmet";
import { Slider } from "../components/elements/slider/Slider";
import {useEffect, useState} from "react";
import {flushSync} from "react-dom";

const LandingPage = () => {

    const [introductionView, setIntroductionView ] = useState(true);

/*
    interface DocumentWithViewTransition extends Document {
        startViewTransition: (callback: () => Promise<void>) => any;
    }
    const documentWithViewTransition = document as DocumentWithViewTransition;
*/


    useEffect(() => {
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handlePopState = (event : any) => {
        event.preventDefault();
        setIntroductionView( prevVariable => !prevVariable)
    };

    return (introductionView?
        (<>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Introduction | Project D</title>
            </Helmet>
            <main className="introductionMain">
                <div className="introBox">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div className="buttonsContainer">
                        <Link to="/">
                            <button onClick={(event) => {
/*
                                documentWithViewTransition.startViewTransition(async () => {
                                    flushSync(() => {
*/
                                        setIntroductionView( prevVariable => !prevVariable)
/*                                    });
                                });*/
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
            </main>
        </>)
            :
            (<>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Description | Project D</title>
                </Helmet>
                <main className="descriptionMain">
                    <div className="backButtonContainer">
                        <button onClick={(event) => {
/*
                            documentWithViewTransition.startViewTransition(async () => {
                                flushSync(() => {
*/
                                    setIntroductionView( prevVariable => !prevVariable)
/*
                                });
                            });
*/
                            window.history.pushState({}, '', '/');
                        }} className="backButton">Вернуться</button>
                    </div>
                    <div style={{marginTop: '3em'}}>
                        <Slider />
                        <p style={{marginTop: '100em'}}>cw</p>
                        <p>cw</p>
                        <p>cw</p>
                        <p>cw</p>
                    </div>
                </main>
            </>)
    )
}

export { LandingPage };