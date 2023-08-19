import { Link } from "react-router-dom";
import "./nav.scss"

export function NavBar() {
    return (
        <>
            <nav>
            <Link to="/About"><img id="GameIcon" src={require('../../images/LogoProjectD.png')} alt="LogoIcon" /></Link>
                <div className="LinksGroup">
                    <div className="leftSide">
                        <Link to="/Home">
                            <div className="LinkButtonContainer">
                                <div className="singleLink">Home</div>
                            </div>
                        </Link>
                        <Link to="/Content">
                            <div className="LinkButtonContainer">
                                <div className="linkButton">Content</div>
                                <div className="submenuButton">
                                    <div className="Arrow">▾</div>
                                </div>
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
                                    <img className="ProfileIcon" src={require('../../images/ThePlagueDoctor.png')} />
                                </div>
                            </Link>)
                            :
                            (<Link to="/Login">
                                <img className="AuthorizationImg" src={require('../../images/AuthorizationIcon.png')} alt="AuthorizationIcon" />
                            </Link>)
                        }</div>
                    </div>

                </div>
            </nav>
        </>
    )
}