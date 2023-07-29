import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";

const NewsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | News</title>
            </Helmet>
            <NavBar />
            <main>News page</main>
        </>
    )
}

export { NewsPage };