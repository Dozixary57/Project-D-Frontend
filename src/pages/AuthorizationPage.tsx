import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";

const AuthorizationPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DizaQute | Authorization</title>
            </Helmet>
            <NavBar />
            <div id="#Authorization">Authorization page</div>
        </>
    )
}

export { AuthorizationPage };