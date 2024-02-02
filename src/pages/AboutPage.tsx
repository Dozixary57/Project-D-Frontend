import { Helmet } from "react-helmet-async";
import { NavBar } from "../components/elements/navigation_bar/NavBar";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | About</title>
            </Helmet>
            <NavBar />
            <main>About page</main>
        </>
    )
}

export { AboutPage };