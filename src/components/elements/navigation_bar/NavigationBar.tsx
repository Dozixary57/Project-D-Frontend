import { Link } from "react-router-dom";
import Floater from 'react-floater';
import "./nav.scss"
import {useEffect, useState} from "react";
import PageProgressBar from "./PageProgressBar";

export function NavBar() {
    const [activeSubmenu, setActiveSubmenu] = useState(false);

    return (
        <>
            <PageProgressBar />
            <nav className={activeSubmenu ? "navInAction" : ""}>
                <Link to="/About"><img id="GameIcon" src={require('../../../images/LogoProjectD.png')} alt="LogoIcon" /></Link>
                <div className="LinksGroup">
                    <div className="leftSide">
                        <Link to="/Home">
                            <div className="LinkButtonContainer">
                                <div className="singleLink">Home</div>
                            </div>
                        </Link>
                        <Link to="/Content">
                            <div id="contentId" className={`LinkButtonContainer ${activeSubmenu? "LinkButtonContainerInAction" : ""}`}>
                                <div className="linkButton">Content</div>
                                <Floater styles={{
                                    container: {
                                        backgroundColor: "transparent",
                                        padding: 0,
                                        minWidth: "auto",
                                        minHeight: "auto",
                                    }
                                }} target="#contentId" event="hover" eventDelay={0.2} placement="bottom" hideArrow={true} offset={-2} open={activeSubmenu} wrapperOptions={{
                                    placement: "bottom", // the same options as above, except center
                                    position: false,
                                }} style={{cursor: "default"}} content={
                                    <div className="subMenuLayout" onMouseEnter={() => setActiveSubmenu(true)} onMouseLeave={() => setActiveSubmenu(false)}>
                                        <div className="subMenu" style={{width: "156px"}}>
                                            <Link to="/Content/Items">
                                                <div>
                                                    <div>
                                                        Items
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="/Content/Creatures">
                                                <div>
                                                    <div>
                                                        Creatures
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="/Content/Locations">
                                                <div>
                                                    <div>
                                                        Locations
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="/Content/Mechanics">
                                                <div>
                                                    <div>
                                                        Mechanics
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                }>
                                    <div className={`submenuButton ${activeSubmenu ? "submenuButtonInAction" : ""}`} onMouseEnter={() => setActiveSubmenu(true)} onMouseLeave={() => setActiveSubmenu(false)}>
                                        <div className={`Arrow ${activeSubmenu ? "ArrowInAction" : ""}`}>▾</div>
                                    </div>
                                </Floater>
                            </div>
                        </Link>
                        <Link to="/News">
                            <div className="LinkButtonContainer">
                                <div className="linkButton">News</div>
                                <div className="submenuButton">
                                    <div className="Arrow">▾</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="rightSide">
                        <Link id="ReceiveM" className="submenuLink" to="/Receive">
                            <div className="LinkButtonContainer">
                                <div className="linkButton">Receive</div>
                                <div className="submenuButton">
                                    <div className="Arrow">▾</div>
                                </div>
                            </div>
                        </Link>
                        <div className="Account">{localStorage.getItem('AccessToken')?
                            (<Link to="/Account">
                                <div className="ProfileContainer">
                                    <label className="ProfileName">Dozixary57</label>
                                    <div className="ProfileIconContainer">
                                        <img src={require('../../../images/ThePlagueDoctor.png')} />
                                    </div>
                                </div>
                            </Link>)
                            :
                            (<Link to="/Login">
                                <img className="AuthorizationImg" src={require('../../../images/AuthorizationIcon.png')} alt="AuthorizationIcon" />
                            </Link>)
                        }</div>
                    </div>
                </div>
            </nav>
        </>
    )
}