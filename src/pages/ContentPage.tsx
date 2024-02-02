import { Helmet } from "react-helmet-async";
import { NavBar } from "../components/elements/navigation_bar/NavBar";

const ContentPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Content</title>
            </Helmet>
            <NavBar />
            <main>
                Content
            </main>
        </>
    )
}

export { ContentPage };