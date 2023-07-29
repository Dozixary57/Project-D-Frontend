import { Link } from "react-router-dom";
import "../components/styles/general_styles/MainDesign.scss";
import "../components/styles/general_styles/PagesDesign.scss";
import { Helmet } from "react-helmet";

const LandingPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute</title>
            </Helmet>
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
        </>
    )
}

export { LandingPage };