import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const AboutMePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Project D | About Me</title>
            </Helmet>
            <Navbar />
            <main>About Me</main>
        </>
    )
}

export { AboutMePage };