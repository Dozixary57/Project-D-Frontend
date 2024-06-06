import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Floater from 'react-floater';
import "./Navbar.scss"
import { useEffect, useRef, useState } from "react";
import PageProgressBar from "./PageProgressBar";
import { NavUsername } from "../../Username";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxStore/store";
import authService from "../../../backend/services/authService";

export function Navbar() {

  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const userPrivileges = useSelector((state: RootState) => state.userPrivileges);

  const [activeContentSubmenu, setActiveContentSubmenu] = useState(false);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [contentContainerWidth, setContentContainerWidth] = useState<number>(0);
  useEffect(() => {
    if (contentContainerRef.current) {
      const rect = contentContainerRef.current.getBoundingClientRect();
      setContentContainerWidth(rect.width);
    }
  }, []);

  const [activeNewsSubmenu, setActiveNewsSubmenu] = useState(false);
  const newsContainerRef = useRef<HTMLDivElement>(null);
  const [newsContainerWidth, setNewsContainerWidth] = useState<number>(0);
  useEffect(() => {
    if (newsContainerRef.current) {
      const rect = newsContainerRef.current.getBoundingClientRect();
      setNewsContainerWidth(rect.width);
    }
  }, []);

  const [activeReceiveSubmenu, setActiveReceiveSubmenu] = useState(false);
  const receiveContainerRef = useRef<HTMLDivElement>(null);
  const [receiveContainerWidth, setReceiveContainerWidth] = useState<number>(0);
  useEffect(() => {
    if (receiveContainerRef.current) {
      const rect = receiveContainerRef.current.getBoundingClientRect();
      setReceiveContainerWidth(rect.width);
    }
  }, []);

  const [activeAccountSubmenu, setActiveAccountSubmenu] = useState(false);
  const accountContainerRef = useRef<HTMLDivElement>(null);
  const [accountContainerWidth, setAccountContainerWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      if (accountContainerRef.current) {
        const rect = accountContainerRef.current.getBoundingClientRect();
        setAccountContainerWidth(rect.width);
      }
    };

    handleResize();


    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isAuthorized]);

  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 975) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <PageProgressBar />
      <nav className={`NAVBAR ${activeContentSubmenu || activeNewsSubmenu || activeReceiveSubmenu || activeAccountSubmenu ? "NAVBAR_Active" : ""}`}>
        {!isOverflowing ? (
          <div className="FullyNavContainer">
            <Link to="/">
              <img id="GameIcon" src={require('../../../images/LogoProjectD.png')} alt="LogoIcon" />
            </Link>
            <Link to="/Home">
              <div id="homeId" className="HomeLink">
                <img src={require('../../../images/HomeIcon.png')} />
                <p>Home</p>
              </div>
            </Link>
            <Link to="/Content">
              <div id="contentId" ref={contentContainerRef} className={`LinkContainer ${activeContentSubmenu ? "ActiveLinkContainer" : ""}`}>
                <div>
                  <img src={require('../../../images/ContentIcon.png')} />
                  <p>Content</p>
                </div>
                <div className={activeContentSubmenu ? "ActiveArrowButton" : "InactiveArrowButton"} onMouseEnter={() => setActiveContentSubmenu(true)} onMouseLeave={() => setActiveContentSubmenu(false)}>
                  <p>▾</p>
                </div>
              </div>
            </Link>
            <Floater styles={{
              container: {
                backgroundColor: "transparent",
                padding: 0,
                minWidth: "auto",
                minHeight: "auto",
              }
            }} target="#contentId" event="hover" eventDelay={0.2} placement="bottom" hideArrow={true} offset={-1} open={activeContentSubmenu} wrapperOptions={{
              placement: "bottom",
              position: false,
            }} style={{ cursor: "default" }} content={
              <div className="subMenuLayout" onMouseEnter={() => setActiveContentSubmenu(true)} onMouseLeave={() => setActiveContentSubmenu(false)}>
                <div className="subMenu" style={{ width: contentContainerWidth }}>
                  <Link to="/Content/Items">
                    <div>
                      <p>
                        Items
                      </p>
                    </div>
                  </Link>
                  <Link to="/Content/Creatures">
                    <div>
                      <p>
                        Creatures
                      </p>
                    </div>
                  </Link>
                  <Link to="/Content/Locations">
                    <div>
                      <p>
                        Locations
                      </p>
                    </div>
                  </Link>
                  <Link to="/Content/Mechanics">
                    <div>
                      <p>
                        Mechanics
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            }>
            </Floater>
            <Link to="/News">
              <div id="newsId" ref={newsContainerRef} className={`LinkContainer ${activeNewsSubmenu ? "ActiveLinkContainer" : ""}`}>
                <div>
                  <img src={require('../../../images/NewsIcon.png')} />
                  <p>News</p>
                </div>
                <div className={activeNewsSubmenu ? "ActiveArrowButton" : "InactiveArrowButton"} onMouseEnter={() => setActiveNewsSubmenu(true)} onMouseLeave={() => setActiveNewsSubmenu(false)}>
                  <p>▾</p>
                </div>
              </div>
            </Link>
            <Floater styles={{
              container: {
                backgroundColor: "transparent",
                padding: 0,
                minWidth: "auto",
                minHeight: "auto",
              }
            }} target="#newsId" event="hover" eventDelay={0.2} placement="bottom" hideArrow={true} offset={-2} open={activeNewsSubmenu} wrapperOptions={{
              placement: "bottom",
              position: false,
            }} style={{ cursor: "default" }} content={
              <div className="subMenuLayout" onMouseEnter={() => setActiveNewsSubmenu(true)} onMouseLeave={() => setActiveNewsSubmenu(false)}>
                <div className="subMenu" style={{ width: newsContainerWidth }}>
                  <Link to="/Content/Items">
                    <div>
                      <p>
                        NewsPage1
                      </p>
                    </div>
                  </Link>
                  <Link to="/Content/Creatures">
                    <div>
                      <p>
                        NewsPage2
                      </p>
                    </div>
                  </Link>
                  <Link to="/Content/Locations">
                    <div>
                      <p>
                        NewsPage3
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            }>
            </Floater>
            <Link to="/Receive">
              <div id="receiveId" ref={receiveContainerRef} className={`LinkContainer ${activeReceiveSubmenu ? "ActiveLinkContainer" : ""}`}>
                <div>
                  <img src={require('../../../images/ReceiveIcon.png')} />
                  <p>Receive</p>
                </div>
                <div className={activeReceiveSubmenu ? "ActiveArrowButton" : "InactiveArrowButton"} onMouseEnter={() => setActiveReceiveSubmenu(true)} onMouseLeave={() => setActiveReceiveSubmenu(false)}>
                  <p>▾</p>
                </div>
              </div>
            </Link>
            <Floater styles={{
              container: {
                backgroundColor: "transparent",
                padding: 0,
                minWidth: "auto",
                minHeight: "auto",
              }
            }} target="#receiveId" event="hover" eventDelay={0.2} placement="bottom" hideArrow={true} offset={-2} open={activeReceiveSubmenu} wrapperOptions={{
              placement: "bottom",
              position: false,
            }} style={{ cursor: "default" }} content={
              <div className="subMenuLayout" onMouseEnter={() => setActiveReceiveSubmenu(true)} onMouseLeave={() => setActiveReceiveSubmenu(false)}>
                <div className="subMenu" style={{ width: receiveContainerWidth }}>
                  <Link to="">
                    <div>
                      <p>
                        Receive Page1
                      </p>
                    </div>
                  </Link>
                  <Link to="">
                    <div>
                      <p>
                        Receive Page2
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            }>
            </Floater>
            <Link to={`${isAuthorized ? "/Account" : "/Login"}`}>
              {!isAuthorized ? (
                <div id="loginId" className="AccountContainer">
                  <img src={require('../../../images/AuthIcon.png')} alt="Authorization Icon" style={{ width: "1.5em" }} />
                  <p>Login</p>
                </div>
              )
                :
                (
                  <div id="accountId" ref={accountContainerRef} className={`LinkContainer ${activeAccountSubmenu ? "ActiveLinkContainer" : ""}`} style={{ minWidth: "10.5em" }}>
                    <div>
                      <img id="profileIcon" src={require('../../../images/ThePlagueDoctor.png')} />
                      <p><NavUsername /></p>
                    </div>
                    <div className={activeAccountSubmenu ? "ActiveArrowButton" : "InactiveArrowButton"} onMouseEnter={() => setActiveAccountSubmenu(true)} onMouseLeave={() => setActiveAccountSubmenu(false)}>
                      <p>▾</p>
                    </div>
                  </div>
                )}
            </Link>
            <Floater styles={{
              container: {
                backgroundColor: "transparent",
                padding: 0,
                minWidth: "auto",
                minHeight: "auto",
              }
            }} target="#accountId" event="hover" eventDelay={0.2} placement="bottom" hideArrow={true} offset={-2} open={activeAccountSubmenu} wrapperOptions={{
              placement: "bottom",
              position: false,
            }} style={{ cursor: "default" }} content={
              <div className="subMenuLayout" onMouseEnter={() => setActiveAccountSubmenu(true)} onMouseLeave={() => setActiveAccountSubmenu(false)}>
                <div className="subMenu" style={{ width: accountContainerWidth }}>
                  <Link to="/Account/Profile">
                    <div>
                      <p>
                        Profile
                      </p>
                    </div>
                  </Link>
                  {userPrivileges && userPrivileges.includes("UserPrivilegesManaging") && (
                    <Link to="/Account/Account_management">
                      <div>
                        <p>
                          Account management
                        </p>
                      </div>
                    </Link>
                  )}
                  <Link to="/Account/Settings">
                    <div>
                      <p>
                        Settings
                      </p>
                    </div>
                  </Link>
                  <Link to="" onClick={() => authService.Logout()}>
                    <div>
                      <p>
                        Log out
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            }>
            </Floater>
          </div>
        )
          :
          (
            <div className="ShortyNavContainer">
              <Link to="/">
                <img id="GameIcon" src={require('../../../images/LogoProjectD.png')} alt="LogoIcon" />
              </Link>
              <Link to="/Home">
                <div id="homeId" className="ShortyLinkButton">
                  <img src={require('../../../images/HomeIcon.png')} />
                </div>
              </Link>
              <Link to="/Content">
                <div id="contentId" ref={contentContainerRef} className="ShortyLinkButton">
                  <img src={require('../../../images/ContentIcon.png')} />
                </div>
              </Link>
              <Link to="/News">
                <div id="newsId" ref={newsContainerRef} className="ShortyLinkButton">
                  <img src={require('../../../images/NewsIcon.png')} />
                </div>
              </Link>
              <Link to="/Receive">
                <div id="receiveId" ref={receiveContainerRef} className="ShortyLinkButton">
                  <img src={require('../../../images/ReceiveIcon.png')} />
                </div>
              </Link>
              <Link to={`${isAuthorized ? "/Account" : "/Login"}`}>
                {!isAuthorized ? (
                  <div id="loginId" className="ShortyLinkButton">
                    <img src={require('../../../images/AuthIcon.png')} alt="Authorization Icon" style={{ width: "1.5em" }} />
                  </div>
                )
                  :
                  (
                    <div id="accountId" ref={accountContainerRef} className="ShortyLinkButton">
                      <img id="profileIcon" src={require('../../../images/ThePlagueDoctor.png')} />
                    </div>
                  )}
              </Link>
            </div>
          )}
      </nav>
    </>
  )
}