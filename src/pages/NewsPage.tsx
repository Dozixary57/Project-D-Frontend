import { Helmet } from "react-helmet-async";
import { Navbar } from "@components/Navbar/Navbar";

const NewsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | News</title>
            </Helmet>
            <Navbar />
            <main>News page</main>
        </>
    )
}

export { NewsPage };