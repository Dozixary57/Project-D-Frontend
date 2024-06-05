import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const GuidePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Guidebook</title>
            </Helmet>
            <Navbar />
            <main>
                Guidebook
            </main>
        </>
    )
}

export { GuidePage };