import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "../components/styles/general_styles/AuthorizationPage.scss"
import {useState} from "react";
import authenticationService from "../backend/services/authenticationService";
import {Link} from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errUsername, setErrUsername] = useState('');
    const [errPassword, setErrPassword] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await authenticationService.postLoginData(username, password);
        setErrUsername(res.errUsername);
        setErrPassword(res.errPassword);
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Log In | DizaQute</title>
            </Helmet>
            <NavBar/>
            <main className="AltMain">
                <form id="Login" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Log In</legend>
                        <label className={`errMsg ${errUsername? 'errMsgV' : ''}`}>{errUsername}</label>
                        <div className="dataField">
                            <input type="text" name="username" value={username} required onChange={(event) => setUsername(event.target.value)} autoComplete="nickname" placeholder=" "
                                   style={{boxShadow: `${username? (errUsername? '0 0 0 0.1em red inset' : '0 0 0 0.1em green inset') : ('0 0 0 0.1em #AAA inset')}`}} className="dataInput"/>
                            <label htmlFor="username" className="floatingLabel">Username</label>
                            {/*<label className="errMsg">{errUsername}</label>*/}
                        </div>
                        <label className={`errMsg ${errPassword? 'errMsgV' : ''}`}>{errPassword}</label>
                        <div className="dataField">
                            <input type="password" name="password" value={password} required onChange={(event) => setPassword(event.target.value)} autoComplete="off" placeholder=" "
                                   style={{boxShadow: `${password? (errPassword? '0 0 0 0.1em red inset' : '0 0 0 0.1em green inset') : ('0 0 0 0.1em #AAA inset')}`}} className="dataInput"/>
                            <label htmlFor="password" className="floatingLabel">Password</label>
                            {/*<label className="errMsg">{errPassword}</label>*/}
                        </div>
                        <div className="externalAuthorization">
                            <button type="button" className="gAuthorization">
                                <img src={require("../components/images/Google.png")} alt="G"/>
                            </button>
                        </div>
                        <div className="checkboxSSI">
                            <input type="checkbox" name="checkbox"/>
                            <label htmlFor="checkbox">Stay signed in</label>
                        </div>
                        <div>
                            <input type="submit" value="Log In" className="dataSubmit"/>
                        </div>
                        <div>
                            <Link to="/Signup" style={{textDecorationLine: 'none'}}>
                                <label className="createAccountLabel">Create an account</label>
                            </Link>
                        </div>
                        <div>
                        </div>
                        <div>
                            <hr className="hr"/>
                            <Link to="/Signup" style={{textDecorationLine: 'none'}}>
                                <label className="canNotLogInLabel">Can't log in?</label>
                            </Link>
                        </div>
                    </fieldset>
                    <div className="agreements">
                        <Link to="/Agreements">
                            <label>PRIVACY NOTICE</label>
                        </Link>
                        <Link to="/Agreements">
                            <label>TERMS OF SERVICE</label>
                        </Link>
                    </div>
                </form>
            </main>
        </>
    )
}

export { LoginPage };