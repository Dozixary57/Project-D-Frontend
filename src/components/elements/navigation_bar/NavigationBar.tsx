import { Link } from "react-router-dom";
import "./nav.scss"

export function NavBar() {
    return (
        <>
            <nav>
                <Link to="/About"><img id="GameIcon" src={require('../../images/LogoProjectD.png')} alt="LogoIcon" /></Link>
                <div id="LeftPart">
                    <Link className="mainLink" to="/Home">Home</Link>
                    <Link id="GuidebookM" className="mainLink" to="/Content">Content<div className="Arrow">▾</div></Link>
                    {/*<div id="GuidebookSM" className="subMenu">*/}
                    {/*    <Link className="subLink" to="/Items">Предметы</Link>*/}
                    {/*</div>*/}
                    <Link id="NewsM" className="mainLink" to="/News">News<div className="Arrow">▾</div></Link>
                    {/*<div id="NewsSM" className="subMenu">*/}
                    {/*    <Link className="subLink" to="">Последние события</Link>*/}
                    {/*</div>*/}
                </div>
                <Link to="/Signin"><img id="AuthorizationIcon" src={require('../../images/AuthorizationIcon.png')} alt="AuthorizationIcon" /></Link>
                <div id="RightPart">
                    <Link id="ReceiveM" className="mainLink" to="/Receive">Receive<div className="Arrow">▾</div></Link>
                    {/*<div id="ReceiveSM" className="subMenu">*/}
                    {/*    <Link className="subLink" to="">Скачать</Link>*/}
                    {/*</div>*/}
                </div>
            </nav>
        </>
    )
}