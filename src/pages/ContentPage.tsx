import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";

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