import { Helmet } from "react-helmet-async";
import { NavBar } from "../components/elements/navigation_bar/NavBar";

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