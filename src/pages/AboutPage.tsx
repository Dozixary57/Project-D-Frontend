import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";

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