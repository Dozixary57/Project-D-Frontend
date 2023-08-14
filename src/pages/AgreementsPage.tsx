import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";

const AgreementsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Agreements | DizaQute</title>
            </Helmet>
            <NavBar />
            <main>Agreements page</main>
        </>
    )
}

export { AgreementsPage };