import { Helmet } from "react-helmet-async";
import { FooterBar } from "../components/elements/footer_bar/FooterBar";
import { NavBar } from "../components/elements/navigation_bar/NavBar";
import { Slider } from "../components/elements/slider/Slider";
import "./HomePage.scss"

const HomePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home | Project D</title>
            </Helmet>
            <NavBar />
            <div className="sliderBlock">
                <Slider />
            </div>
            <main className="HomePageMain">
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
                <p>Home page</p>
            </main>
            <FooterBar />
        </>
    )
}

export { HomePage };