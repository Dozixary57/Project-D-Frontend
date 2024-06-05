import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const ContentPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Content</title>
            </Helmet>
            <Navbar />
            <main>
                Content
            </main>
        </>
    )
}

export { ContentPage };