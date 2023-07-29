import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "../components/styles/general_styles/AuthorizationPage.scss"
import {useState} from "react";
import authenticationService from "../backend/services/authenticationService";

const SigninPage = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (event: any) => {
            event.preventDefault();
            // console.log(username)
            // console.log(password)
            authenticationService.postSigninData(username, password);
        };
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Sign in | DizaQute</title>
                </Helmet>
                <NavBar/>
                <main className="AltMain">
                    <form id="Signin" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Log in</legend>
                            <div className="dataField">
                                <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="nickname" placeholder=" "
                                       className="dataInput"/>
                                <label htmlFor="username" className="floatingLabel">Username</label>
                            </div>
                            <div className="dataField">
                                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="off" placeholder=" "
                                       className="dataInput"/>
                                <label htmlFor="password" className="floatingLabel">Password</label>
                            </div>
                            <div>
                                <input type="checkbox" name="checkbox"/>
                                <label htmlFor="checkbox">Stay signed in</label>
                            </div>
                            <div>
                                <input type="submit" value="Log in" className="dataSubmit"/>
                            </div>
                            <div>
                                <label className="externalLoginLabel">Log in with</label>
                                <hr className="hr"/>
                                <div className="externalAuthorization">
                                    <button type="button" className="gAuthorization">
                                        <img src={require("../components/images/Google.png")} alt="G"/>
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </main>
            </>
        )
}

export { SigninPage };