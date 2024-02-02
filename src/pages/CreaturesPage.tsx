import { Helmet } from "react-helmet-async";
import { NavBar } from "../components/elements/navigation_bar/NavBar";

const CreaturesPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dozixary57 | Creatures</title>
            </Helmet>
            <NavBar />
            <main>Creatures page</main>
        </>
    )
}

export { CreaturesPage };