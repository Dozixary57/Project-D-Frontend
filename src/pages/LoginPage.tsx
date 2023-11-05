import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "./LoginPage.scss"
import {useState} from "react";
import authService from "../backend/services/authService";
import {Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errUsername, setErrUsername] = useState('');
    const [validUsername, setValidUsername] = useState('#AAA');

    const [errPassword, setErrPassword] = useState('');
    const [validPassword, setValidPassword] = useState('#AAA');

    const [msgSuccess, setMsgSuccess] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await authService.Login(username, password);
        setErrUsername(res.errUsername);
        setErrPassword(res.errPassword);
        setMsgSuccess(res.msgSuccess)
        if (!res.errUsername) {
            setValidUsername('green')
        } else {
            setValidUsername('red')
        }
        if (!res.errPassword) {
            setValidPassword('green')
        } else {
            setValidPassword('red')
        }
        if (res.msgSuccess) {
            await new Promise(resolve => setTimeout(resolve, 4000));
            navigate("/Home")
            window.location.reload()
        }
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Log In | DizaQute</title>
            </Helmet>
            <NavBar/>
            <main className="LoginPageMain">
                {!msgSuccess? (
                    <form id="Login" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Log In</legend>
                            <label className={`errMsg ${errUsername? 'errMsgV' : ''}`}>{errUsername}</label>
                            <div className="dataField">
                                <input type="text" name="username" value={username} required onChange={(event) => {
                                    setUsername(event.target.value)
                                    setValidUsername('#AAA')
                                }} autoComplete="nickname" placeholder=" "
                                       style={{boxShadow: `0 0 0 0.1em ${validUsername} inset`}} className="dataInput"/>
                                <label htmlFor="username" className="floatingLabel">Username</label>
                                {/*<label className="errMsg">{errUsername}</label>*/}
                            </div>
                            <label className={`errMsg ${errPassword? 'errMsgV' : ''}`}>{errPassword}</label>
                            <div className="dataField">
                                <input type="password" name="password" value={password} required onChange={(event) => {
                                    setPassword(event.target.value)
                                    setValidPassword('#AAA')
                                }} autoComplete="off" placeholder=" "
                                       style={{boxShadow: `0 0 0 0.1em ${validPassword} inset`}} className="dataInput"/>
                                <label htmlFor="password" className="floatingLabel">Password</label>
                                {/*<label className="errMsg">{errPassword}</label>*/}
                            </div>
                            <div className="externalAuthorization">
                                <button type="button" className="gAuthorization">
                                    <img src={require("../images/Google.png")} alt="G"/>
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
                    </form>)
                :
                    (<label className="msgSuccess">
                        {msgSuccess}
                    </label>)
                }
            </main>
        </>
    )
}

export { LoginPage };