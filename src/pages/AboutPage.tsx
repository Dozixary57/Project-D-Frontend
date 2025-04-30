import { Helmet } from "react-helmet-async";
import { Navbar } from "@components/Navbar/Navbar";

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