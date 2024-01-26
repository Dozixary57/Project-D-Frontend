import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavBar";

const AboutMePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Project D | About Me</title>
            </Helmet>
            <NavBar />
            <main>About Me</main>
        </>
    )
}

export { AboutMePage };