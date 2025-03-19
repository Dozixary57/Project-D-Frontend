import { Link } from "react-router-dom";
import style from "./Footer.module.scss"

export function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.language}>
        <select>
          <option>English</option>
          <option disabled>Русский</option>
        </select>
      </div>
      <div className={style.navigation}>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/Content/Items">
          <p>Content</p>
        </Link>
        <Link to="/News">
          <p>News</p>
        </Link>
        <Link to="/Receive">
          <p>Receive</p>
        </Link>
        <Link to="/About">
          <p>About</p>
        </Link>
        <Link to="/Contact">
          <p>Contact</p>
        </Link>
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