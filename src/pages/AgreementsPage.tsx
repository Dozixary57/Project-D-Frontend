import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const AgreementsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Agreements | DizaQute</title>
            </Helmet>
            <Navbar />
            <main>Agreements page</main>
        </>
    )
}

export { AgreementsPage };