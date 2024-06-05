import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";

const ReceivePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Receive</title>
            </Helmet>
            <Navbar />
            <main>Receive page</main>
        </>
    )
}

export { ReceivePage };