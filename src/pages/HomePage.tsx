import { Helmet } from "react-helmet";
import { FooterBar } from "../components/elements/footer_bar/FooterBar";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import { Slider } from "../components/elements/slider/Slider";

const HomePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Home</title>
            </Helmet>
            <NavBar />
            <main>
                <Slider />
            </main>
            <main>
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