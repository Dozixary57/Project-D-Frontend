import { Link } from "react-router-dom";
import "./LandingPage.scss";
import { Helmet } from "react-helmet";
import { Slider } from "../components/elements/slider/Slider";


const LandingPage = () => {
    return (
        <>
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
                        <Link to="/Home" style={{marginRight: '0.5em'}}>
                            <button>Подробнее</button>
                        </Link>
                        <Link to="/Home" style={{marginLeft: '0.5em'}}>
                            <button>Подробнее</button>
                        </Link>
                    </div>
                </div>

{/*
                <div id="LogoContainer">
                    <img id="GameLogo" src={require('../components/images/GameLogoHor.png')} alt="GameLogo" />
                </div>
                <img id="MainImg" src={require('../components/images/Background.png')} alt="MainBackgroundImage" />
                <div id="LandingPage">
                    <div id="Content">
                        <div id="BeginText">
                            <p id="BeginText">Project D - проект rrejgk ger jg egkg er erkg ekrg ke gerkg kerg ek gk ker jgkegjk ergkj erjkg er gker gkje rgkergk er gke rg r gke rgkerge rgkjer grgkje gekweopkc pwock wpcowkc po h5r h567rj jr rj7r rj7</p>
                        </div>
                        <Link to="/Home"><button id="BeginButton" className="beginButton">Подробнее</button></Link>
                    </div>
                </div>
                <p id="JuridInfo">Авторские права защищены юридически и все такое...</p>
*/}
            </main>
{/*            <main className="descriptionMain" >

            </main>*/}
        </>
    )
}

export { LandingPage };