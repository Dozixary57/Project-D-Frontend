import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const CreaturesPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dozixary57 | Creatures</title>
            </Helmet>
            <Navbar />
            <main>Creatures page</main>
        </>
    )
}

export { CreaturesPage };