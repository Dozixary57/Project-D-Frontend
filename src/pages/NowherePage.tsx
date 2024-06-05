import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const NowherePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Page not found</title>
            </Helmet>
            <Navbar />
            <p>Данной страницы не существует.</p>
        </>
    )
}

export { NowherePage };