import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const LocationsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dozixary57 | Locations</title>
            </Helmet>
            <Navbar />
            <main>Locations page</main>
        </>
    )
}

export { LocationsPage };