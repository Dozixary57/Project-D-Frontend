import { Helmet } from "react-helmet-async";
import { NavBar } from "../components/elements/navigation_bar/NavBar";
import "./AccountPage.scss"
import { url } from "inspector";
import { Username } from "../components/Username";

const AccountPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Account | DizaQute</title>
            </Helmet>
            <NavBar />
            <main className="ACCOUNT_PAGE">
                <div className="ProfileHeader">
                    <div className="ProfileBanner">
                        <img src="https://designhub.co/wp-content/uploads/2020/09/Banner5.jpg" />
                    </div>
                    <div className="ProfileIcon">
                        <div className="ProfileTitle">
                            <div className="ProfileUsername">
                                <p><Username /></p>
                            </div>
                            <p className="ProfileProgress">
                                X+
                            </p>
                        </div>
                        <p className="ProfileStatus">Player</p>
                        <img src={require('../images/ThePlagueDoctor.png')} />
                        {/* <img src={require('../images/ProfileIconFrame.png')} /> */}
                    </div>
                </div>
            </main>
        </>
    )
}

export { AccountPage };