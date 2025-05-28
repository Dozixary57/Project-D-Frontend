import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Floater from 'react-floater';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";
import authService from "@services/authService";
import { IPrivileges } from "@interfaces/IAccounts";
import { GetNavUsername } from "@tools/GetUserData";
import "./Navbar.scss"

interface INavbarData {
  title: string;
  icon: string;
  link: string;
  submenu?: {
    title: string;
    link: string;
  }[];
  iconStyles?: React.CSSProperties;
}

const handleSubmenuResize = (ref: React.RefObject<HTMLDivElement>, setSubmenuWidth: React.Dispatch<React.SetStateAction<number>>) => {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    setSubmenuWidth(Math.max(rect.width, 160));
  }
}

const LogoNavButton = ({ title, icon, link, isMinimized = false, iconStyles }: { title: string, icon: string, link: string, isMinimized?: boolean, iconStyles?: React.CSSProperties }) => {
  return (
    <Link to={link}>
      <div className={`LogoNavButton ${isMinimized ? "Minimized" : ""}`}>
        {!isMinimized && <p>{title}</p>}
        <img src={icon} alt={title} style={iconStyles} />
      </div>
    </Link>
  )
}

const SingleNavButton = ({ title, icon, link, isMinimized = false, iconStyles }: { title: string, icon: string, link: string, isMinimized?: boolean, iconStyles?: React.CSSProperties }) => {
  return (
    <Link to={link}>
      <div className={`SingleNavButton ${isMinimized ? "Minimized" : ""}`}>
        <img src={icon} alt={title} style={iconStyles} />
        {!isMinimized && <p>{title}</p>}
      </div>
    </Link>
  )
}

const GroupNavButton = ({ title, icon, link, submenu, isMinimized = false, iconStyles }: { title: string, icon: string, link: string, submenu?: { title: string; link: string; }[]; isMinimized?: boolean, iconStyles?: React.CSSProperties }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submenuWidth, setSubmenuWidth] = useState<number>(0);
  const [isActiveSubmenu, setIsActiveSubmenu] = useState(false);

  return (
    <>
      <Link to={link}>
        <div
          id={title + 'Id'}
          ref={containerRef}
          className={`GroupNavButton ${isActiveSubmenu ? "ActiveSubmenu" : ""} ${isMinimized ? "Minimized" : ""}`}
          onMouseEnter={() => {
            handleSubmenuResize(containerRef, setSubmenuWidth);

            if (isMinimized) {
              setIsActiveSubmenu(true);
            }
          }}
          onMouseLeave={isMinimized ? () => setIsActiveSubmenu(false) : undefined}
        >
          {!isMinimized ? (
            <>
              <div>
                <img src={icon} alt={title} style={iconStyles} />
                <p>{title}</p>
              </div>
              <div
                className={isActiveSubmenu ? "ActiveArrowNavButton" : "InactiveArrowNavButton"}
                onMouseEnter={() => setIsActiveSubmenu(true)}
                onMouseLeave={() => setIsActiveSubmenu(false)}
              >
                <p>▾</p>
              </div>
            </>
          ) : (
            <img src={icon} alt={title} />
          )}
        </div>
      </Link>
      <Floater
        styles={{
          container: {
            backgroundColor: "transparent",
            padding: 0,
            minWidth: "auto",
            minHeight: "auto",
          }
        }}
        target={'#' + title + 'Id'}
        event="hover"
        eventDelay={0.2}
        placement="bottom"
        hideArrow={true}
        offset={-1}
        open={isActiveSubmenu}
        wrapperOptions={{
          placement: "bottom",
          position: false,
        }}
        style={{ cursor: "default" }}
        content={
          <div className="submenuLayout" onMouseEnter={() => setIsActiveSubmenu(true)} onMouseLeave={() => setIsActiveSubmenu(false)}>
            <div className="submenu" style={{ width: submenuWidth }}>
              {submenu && submenu.map((item, index) => (
                <Link key={index} to={item.link}>
                  <div>
                    <p>{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        }
      >
      </Floater>
    </>
  )
}

const AccountNavButton = ({ isMinimized = false, iconStyles }: { isMinimized?: boolean, iconStyles?: React.CSSProperties }) => {
  const userPrivileges = useSelector((state: RootState) => state.userPrivileges) as IPrivileges[] | [];

  const containerRef = useRef<HTMLDivElement>(null);
  const [submenuWidth, setSubmenuWidth] = useState<number>(0);
  const [isActiveSubmenu, setIsActiveSubmenu] = useState(false);

  return (
    <>
      <Link to="/Account">
        <div
          id="AccountId"
          ref={containerRef}
          className={`GroupNavButton ${isActiveSubmenu ? "ActiveSubmenu" : ""} ${isMinimized ? "Minimized" : ""}`}
          style={{ border: "none" }}
          onMouseEnter={() => {
            handleSubmenuResize(containerRef, setSubmenuWidth);

            if (isMinimized) {
              setIsActiveSubmenu(true);
            }
          }}
          onMouseLeave={isMinimized ? () => setIsActiveSubmenu(false) : undefined}
        >
          {!isMinimized ? (
            <>
              <div>
                <img src={require("@images/ThePlagueDoctor.png")} alt="Profile picture" style={iconStyles} />
                <p><GetNavUsername /></p>
              </div>
              <div
                className={isActiveSubmenu ? "ActiveArrowNavButton" : "InactiveArrowNavButton"}
                onMouseEnter={() => setIsActiveSubmenu(true)}
                onMouseLeave={() => setIsActiveSubmenu(false)}
              >
                <p>▾</p>
              </div>
            </>
          ) : (
            <img src={require("@images/ThePlagueDoctor.png")} alt="Profile picture" style={iconStyles} />
          )}
        </div>
      </Link>
      <Floater
        styles={{
          container: {
            backgroundColor: "transparent",
            padding: 0,
            minWidth: "auto",
            minHeight: "auto",
          }
        }}
        target="#AccountId"
        event="hover"
        eventDelay={0.2}
        placement="bottom"
        hideArrow={true}
        offset={-1}
        open={isActiveSubmenu}
        wrapperOptions={{
          placement: "bottom",
          position: false,
        }}
        style={{ cursor: "default" }}
        content={
          <div className="submenuLayout" onMouseEnter={() => setIsActiveSubmenu(true)} onMouseLeave={() => setIsActiveSubmenu(false)}>
            <div className="submenu" style={{ width: submenuWidth }}>
              <Link to="/Account/Profile">
                <div>
                  <p>Profile</p>
                </div>
              </Link>
              <Link to="/Account/Settings">
                <div>
                  <p>Settings</p>
                </div>
              </Link>
              {userPrivileges && ["UserEdit", "UserDelete", "UserCreate", "UserPrivilegesManaging"].some(privilege => userPrivileges.some(userPrivilege => userPrivilege.Title === privilege)
              ) && (
                  <Link to="/Service/Account_management">
                    <div>
                      <p>
                        Account management
                      </p>
                    </div>
                  </Link>
                )
              }
              {userPrivileges && ["AvatarAdd", "AvatarDelete"].some(privilege => userPrivileges.some(userPrivilege => userPrivilege.Title === privilege)
              ) && (
                  <Link to="/Service/File_management">
                    <div>
                      <p>
                        File management
                      </p>
                    </div>
                  </Link>
                )
              }
              <Link to="" onClick={() => authService.Logout()}>
                <div>
                  <p>Log out</p>
                </div>
              </Link>
            </div>
          </div>
        }
      >
      </Floater>
    </>
  )
}

export function Navbar() {
  const { t } = useTranslation();

  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const navbarData: readonly INavbarData[] = [
    {
      title: t("navbar.home"),
      icon: require('@images/HomeIcon.png'),
      link: "/Home",
    },
    {
      title: t("navbar.content"),
      icon: require('@images/ContentIcon.png'),
      link: "/Content",
      submenu: [
        {
          title: "Items",
          link: "/Content/Items",
        },
        {
          title: "Creatures",
          link: "/Content/Creatures",
        },
        {
          title: "Locations",
          link: "/Content/Locations",
        },
      ]
    },
    {
      title: t("navbar.news"),
      icon: require('@images/NewsIcon.png'),
      link: "/News",
      submenu: [
        {
          title: "NewsPage1",
          link: "/News1",
        },
        {
          title: "NewsPage2",
          link: "/News2",
        },
      ]
    },
    {
      title: t("navbar.receive"),
      icon: require('@images/ReceiveIcon.png'),
      link: "/Receive",
      submenu: [
        {
          title: "Receive Page1",
          link: "/Receive1",
        },
        {
          title: "Receive Page2",
          link: "/Receive2",
        },
      ]
    },
  ];

  const handleNavbarResize = () => {
    if (window.innerWidth < 1145) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }

  useEffect(() => {
    handleNavbarResize();

    window.addEventListener('resize', handleNavbarResize);

    return () => {
      window.removeEventListener('resize', handleNavbarResize);
    };
  }, []);

  return (
    <nav className="NAVBAR">
      <LogoNavButton
        title="Project"
        icon={require('@images/LogoProjectD.png')}
        link="/"
        isMinimized={isOverflowing}
      />
      {navbarData.map((item, index) => {
        if (item.submenu) {
          return (
            <GroupNavButton
              key={index}
              title={item.title}
              icon={item.icon}
              link={item.link}
              submenu={item.submenu}
              isMinimized={isOverflowing}
            />
          )
        } else {
          return (
            <SingleNavButton
              key={index}
              title={item.title}
              icon={item.icon}
              link={item.link}
              isMinimized={isOverflowing}
            />
          )
        }
      })}
      {isAuthorized ?
        <AccountNavButton
          isMinimized={isOverflowing}
          iconStyles={{
            filter: "none",
            clipPath: "polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 72%, 0% 28%)",
          }}
        />
        :
        <SingleNavButton
          title={t("navbar.login")}
          icon={require('@images/AuthIcon.png')}
          link="/Login"
          isMinimized={isOverflowing}
          iconStyles={{ transform: "scale(0.95)" }}
        />
      }
    </nav>
  )
}