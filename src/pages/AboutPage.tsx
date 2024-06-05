import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | About</title>
            </Helmet>
            <Navbar />
            <main>About page</main>
        </>
    )
}

export { AboutPage };