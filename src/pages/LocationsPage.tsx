import { Helmet } from "react-helmet-async";
import { NavBar } from "../components/elements/navigation_bar/NavBar";

const LocationsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dozixary57 | Locations</title>
            </Helmet>
            <NavBar />
            <main>Locations page</main>
        </>
    )
}

export { LocationsPage };