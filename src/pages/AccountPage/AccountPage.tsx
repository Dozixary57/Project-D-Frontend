import { Helmet } from "react-helmet-async";
import "./AccountPage.scss"
import { Link } from "react-router-dom";
import { Navbar } from "@components/Navbar/Navbar";
import { GetUsername } from "@tools/GetUserData";

const AccountPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Account | DizaQute</title>
            </Helmet>
            <Navbar />
            <main className="ACCOUNT_PAGE">
                <div className="ProfileHeader">
                    <div className="ProfileBanner">
                        <img src="https://designhub.co/wp-content/uploads/2020/09/Banner5.jpg" />
                    </div>
                    <div className="ProfileIcon">
                        <div className="ProfileUsername">
                            <p><GetUsername /></p>
                            <div className="ProfileProgress">
                                <p>X+</p>
                            </div>
                            <div className="ProfileEdit">
                                <button>
                                    <img src={require('@images/EditingIcon.png')} />
                                </button>
                            </div>
                        </div>
                        <p className="ProfileStatus">Title</p>
                        <img src={require('@images/ThePlagueDoctor.png')} />
                    </div>
                    <div className="AccountSettings">
                        <Link to="/AccountSettings">
                            <button>
                                <img src={require('@images/SettingsIcon.png')} />
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export { AccountPage };