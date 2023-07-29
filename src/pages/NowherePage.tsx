import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";

const NowherePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Page not found</title>
            </Helmet>
            <NavBar />
            <p>Данной страницы не существует.</p>
        </>
    )
}

export { NowherePage };