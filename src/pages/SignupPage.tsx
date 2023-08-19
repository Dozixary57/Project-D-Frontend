import { Helmet } from "react-helmet";
import { NavBar } from "../components/elements/navigation_bar/NavigationBar";
import "./SignupPage.scss"
import {useState} from "react";
import authService from "../backend/services/authService";
import {Link} from "react-router-dom";

const SingupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    ////
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleInputChange = (event: any) => {
        setSelectedDate(event.target.value);
    };

    const handleInputFocus = () => {
        if (!selectedDate) {
            setShowDatePicker(true);
        }
    };

    const handleDateChange = (event: any) => {
        setSelectedDate(event.target.value);
        setShowDatePicker(false);
    };
    ////

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // authenticationService.postSigninData(username, password);
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Sign Up | DizaQute</title>
            </Helmet>
            <NavBar/>
            <main className="SignupPageMain">
                <form id="Signup" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Sign Up</legend>
                        <div className="dataField">
                            <input type="text" name="username" value={username} required onChange={(event) => setUsername(event.target.value)} autoComplete="nickname" placeholder=" "
                                   className="dataInput"/>
                            <label htmlFor="username" className="floatingLabel">Username<span> ̊ </span></label>
                        </div>
                        <div className="dataField">
                            <input type="email" name="email" value={email} required onChange={(event) => setEmail(event.target.value)} autoComplete="off" placeholder=" "
                                   className="dataInput"/>
                            <label htmlFor="password" className="floatingLabel">Email<span> ̊ </span></label>
                        </div>
                        <div className="dataField">
                            {showDatePicker || selectedDate ? (
                                <>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        placeholder=" "
                                        onChange={handleDateChange}
                                        onBlur={() => setShowDatePicker(false)}
                                        style={{paddingRight: '0.5em'}}
                                        className="dataInput dateModifier"
                                    />
                                    <label htmlFor="password" className="floatingLabel">Date of birth</label>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        value={selectedDate}
                                        placeholder=" "
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        className="dataInput"
                                    />
                                    <label htmlFor="password" className="floatingLabel">Date of birth</label>
                                </>
                            )}
                        </div>
                        <div className="dataField">
                            <input type="password" name="password" value={password} required onChange={(event) => setPassword(event.target.value)} autoComplete="off" placeholder=" "
                                   className="dataInput"/>
                            <label htmlFor="password" className="floatingLabel">Password<span> ̊ </span></label>
                        </div>
                        <div className="dataField">
                            <input type="password" name="passwordConfirm" value={passwordConfirm} required onChange={(event) => setPasswordConfirm(event.target.value)} autoComplete="off" placeholder=" "
                                   className="dataInput"/>
                            <label htmlFor="password" className="floatingLabel">Confirm Password<span> ̊ </span></label>
                        </div>
                        <div className="externalAuthorization">
                            <button type="button" className="gAuthorization">
                                <img src={require("../components/images/Google.png")} alt="G"/>
                            </button>
                        </div>
                        <div className="checkboxSSI">
                            <input type="checkbox" required name="checkbox"/>
                            <label htmlFor="checkbox" className="agreements">I got acquainted with
                                <Link to="/Agreements">
                                <label>PRIVACY NOTICE</label>
                                </Link> and
                                <Link to="/Agreements">
                                    <label>TERMS OF SERVICE</label>
                                </Link>,
                                and I give my consent to the processing of personal data.
                            </label>
                        </div>
                        <div className="checkboxSSI">
                            <input type="checkbox" name="checkbox2"/>
                            <label htmlFor="checkbox2">Instant login</label>
                        </div>
                        <div>
                            <input type="submit" value="Sign Up" className="dataSubmit"/>
                        </div>
                        <div>
                            <Link to="/Login" style={{textDecorationLine: 'none'}}>
                                <label className="loginAccountLabel">Log in to account</label>
                            </Link>
                        </div>
                    </fieldset>
                </form>
            </main>
        </>
    )
}

export { SingupPage };