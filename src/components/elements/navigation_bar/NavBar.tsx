import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Floater from 'react-floater';
import "./Navbar.scss"
import { useEffect, useRef, useState } from "react";
import PageProgressBar from "./PageProgressBar";
import { Username } from "../../Username";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxStore/store";

export function Navbar() {

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

  //   const [activeAccountSubmenu, setActiveAccountSubmenu] = useState(false);

  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  return (
    <>
      <PageProgressBar />
      <nav className="NAVBAR">
        <Link to="/">
          <img id="GameIcon" src={require('../../../images/LogoProjectD.png')} alt="LogoIcon" />
        </Link>
        <Link to="/Home">
          <div id="homeId" className="HomeLink">
            <p>Home</p>
          </div>
        </Link>
        <Link to="/Content">
            <div id="contentId" ref={contentContainerRef} className="LinkContainer">
              <div>
                <p>Content</p>
              </div>
              <div onMouseEnter={() => setActiveContentSubmenu(true)} onMouseLeave={() => setActiveContentSubmenu(false)}>
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
          <div id="newsId" ref={newsContainerRef} className="LinkContainer">
            <div>
              <p>News</p>
            </div>
            <div onMouseEnter={() => setActiveNewsSubmenu(true)} onMouseLeave={() => setActiveNewsSubmenu(false)}>
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
                    news
                  </p>
                </div>
              </Link>
              <Link to="/Content/Creatures">
                <div>
                  <p>
                    news
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
        <Link to="/Receive">
          <div id="receiveId" ref={receiveContainerRef} className="LinkContainer">
            <div>
              <p>Receive</p>
            </div>
            <div onMouseEnter={() => setActiveReceiveSubmenu(true)} onMouseLeave={() => setActiveReceiveSubmenu(false)}>
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
          <Link to={`${isAuthorized ? "/Account" : "/Login"}`}>
            <div id="accountId" className="AccountContainer">
                <p>{isAuthorized ? <Username /> : "Login"}</p>
                <img src={isAuthorized ? require('../../../images/ThePlagueDoctor.png') : require('../../../images/AuthorizationIcon.png')} alt="Authorization Icon" style={{ width: isAuthorized ? "2em" : "1.5em" }} />
            </div>
          </Link>
      </nav>
    </>
  )
}