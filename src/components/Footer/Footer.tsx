import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./Footer.module.scss"

export const Footer = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <footer className={style.footer}>
      <div className={style.language}>
        <select value={i18n.language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
      </div>
      <div className={style.navigation}>
        <Link to="/">
          <p>{t('navbar.home')}</p>
        </Link>
        <Link to="/Content/Items">
          <p>{t('navbar.content')}</p>
        </Link>
        <Link to="/News">
          <p>{t('navbar.news')}</p>
        </Link>
        <Link to="/Receive">
          <p>{t('navbar.receive')}</p>
        </Link>
        {/* <Link to="/About">
          <p>{t('navbar.about')}</p>
        </Link>
        <Link to="/Contact">
          <p>{t('navbar.contact')}</p>
        </Link> */}
      </div>
      {/* <div className={style.socialMedia}>
        <Link to="https://www.youtube.com/">
          <img src={require("@images/YoutubeIcon.png")} alt="youtube" />
        </Link>
      </div> */}
      <div className={style.company}>
        <img src={require("@images/StudioLogo.png")} alt="studio logo" />
        <p>© 2025 Quantum Chance Studio, Inc.</p>
      </div>
      <div className={style.line}>
        <hr />
      </div>
      <div className={style.copyright}>
        <Link to="/Privacy_policy">
          <p>Privacy Policy</p>
        </Link>
        <Link to="/Terms_of_service">
          <p>Terms of Service</p>
        </Link>
        <Link to="/Cookie_policy">
          <p>Cookie Policy</p>
        </Link>
      </div>
    </footer>
  )
}

export const FooterMinimized = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <footer className={`${style.footer} ${style.minimized}`}>
      <div className={style.language}>
        <select value={i18n.language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
      </div>
      <div className={style.line}>
        <hr />
      </div>
      <div className={style.copyright}>
        <Link to="/Privacy_policy">
          <p>Privacy Policy</p>
        </Link>
        <Link to="/Terms_of_service">
          <p>Terms of Service</p>
        </Link>
        <Link to="/Cookie_policy">
          <p>Cookie Policy</p>
        </Link>
      </div>
    </footer>
  )
}