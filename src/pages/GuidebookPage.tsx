import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";

const GuidePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Guidebook</title>
            </Helmet>
            <NavBar />
            <main>
                Guidebook
            </main>
        </>
    )
}

export { GuidePage };