import { Helmet } from "react-helmet";
import Slider from "../components/TEST/TEST";

const TestPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>TEST</title>
            </Helmet>
            <Slider />
        </>
    )
}

export { TestPage };