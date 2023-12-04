import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavBar";

const ReceivePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Receive</title>
            </Helmet>
            <NavBar />
            <main>Receive page</main>
        </>
    )
}

export { ReceivePage };