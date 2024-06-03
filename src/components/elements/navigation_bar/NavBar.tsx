import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Floater from 'react-floater';
import "./NavBar.scss"
import {useEffect, useState} from "react";
import PageProgressBar from "./PageProgressBar";
import { Username } from "../../Username";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxStore/store";

export function NavBar() {
    const [cookies] = useCookies(['UniqueDeviceIdentifier']);

    const [activeContentSubmenu, setActiveContentSubmenu] = useState(false);
    const [activeAccountSubmenu, setActiveAccountSubmenu] = useState(false);

    const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

    return (
        <>
            <PageProgressBar />
            <nav className={activeContentSubmenu ? "navInAction" : ""}>
                <Link to="/About"><img id="GameIcon" src={require('../../../images/LogoProjectD.png')} alt="LogoIcon" /></Link>
                <div className="LinksGroup">
                    <div className="leftSide">
                        <Link to="/Home">
                            <div className="LinkButtonContainer">
                                <div className="singleLink">Home</div>
                            </div>
                        </Link>
                        <Link to="/Content">
                            <div id="contentId" className={`LinkButtonContainer ${activeContentSubmenu? "LinkButtonContainerInAction" : ""}`}>
                                <div className="linkButton">Content</div>
                                <Floater styles={{
                                    container: {
                                        backgroundColor: "transparent",
                                        padding: 0,
                                        minWidth: "auto",
                                        minHeight: "auto",
                                    }
                                }} target="#contentId" event="hover" eventDelay={0.2} placement="bottom" hideArrow={true} offset={-2} open={activeContentSubmenu} wrapperOptions={{
                                    placement: "bottom", // the same options as above, except center
                                    position: false,
                                }} style={{cursor: "default"}} content={
                                    <div className="subMenuLayout" onMouseEnter={() => setActiveContentSubmenu(true)} onMouseLeave={() => setActiveContentSubmenu(false)}>
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
                                    <div className={`submenuButton ${activeContentSubmenu ? "submenuButtonInAction" : ""}`} onMouseEnter={() => setActiveContentSubmenu(true)} onMouseLeave={() => setActiveContentSubmenu(false)}>
                                        <div className={`Arrow ${activeContentSubmenu ? "ArrowInAction" : ""}`}>▾</div>
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
                        <div className="Account">{isAuthorized?
                            (<Link to="/Account"> {/* /Account/Profile */}
                                <div id="accountId"  className="ProfileContainer" onMouseEnter={() => setActiveAccountSubmenu(true)} onMouseLeave={() => setActiveAccountSubmenu(false)}>
                                    <p className="ProfileName">{<Username />}</p>
                                    <div className="ProfileIconContainer">
                                        <img src={require('../../../images/ThePlagueDoctor.png')} />
                                    </div>
                                </div>
         {/*                       <Floater styles={{
                                    container: {
                                        backgroundColor: "transparent",
                                        padding: 0,
                                        minWidth: "auto",
                                        minHeight: "auto",
                                    }
                                }} target="#accountId" event="hover" eventDelay={0.2} placement="bottom" hideArrow={true} offset={-2} open={activeAccountSubmenu} wrapperOptions={{
                                    placement: "bottom",
                                    position: false,
                                }} style={{cursor: "default"}} content={
                                    <div className="subMenuLayout" onMouseEnter={() => setActiveAccountSubmenu(true)} onMouseLeave={() => setActiveAccountSubmenu(false)}>
                                        <div className="subMenu" style={{width: "170px"}}>
                                            <Link to="/Account/Settings">
                                                <div>
                                                    <div>
                                                        Settings
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="/Account/Logout">
                                                <div>
                                                    <div>
                                                        Log out
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                }>
                                </Floater>*/}
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