import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";
import "./LoginPage.scss"
import {useEffect, useState} from "react";
import authService from "../backend/services/authService";
import {Link, useNavigate } from "react-router-dom";
// import { GoogleReCaptcha } from "react-google-recaptcha-v3";

interface IErrorMessages { 
    usernameEmailErrMsg: string | null;
    passwordErrMsg: string | null;
}

const LoginPage = () => {
   //  const [captchaToken, setCaptchaToken] = useState('');
    const [authMessage, setAuthMessage] = useState<string | null>(null);
 
    const navigate = useNavigate();
 
    const [usernameEmail, setUsernameEmail] = useState('');
  
    const [password, setPassword] = useState('');
 
    const [fieldErrorMessages, setFieldErrorMessages] = useState<IErrorMessages>({
       usernameEmailErrMsg: null,
       passwordErrMsg: null,
    });
    
    useEffect(() => {
       if (usernameEmail.length > 0) {
          setFieldErrorMessages(prevState => ({
             ...prevState,
             usernameEmailErrMsg: null
          }));
       }
    }, [usernameEmail]);
    useEffect(() => {
       if (password.length > 0) {
          setFieldErrorMessages(prevState => ({
             ...prevState,
             passwordErrMsg: null
          }));
       }
    }, [password]);
 
    function clientErrorChecking() {
       let flag = false;
       if (usernameEmail.length == 0) {
          setFieldErrorMessages(prevState => ({
             ...prevState,
             usernameEmailErrMsg: "The value should not be empty"
          }));
          flag = true;
       }
       if (password.length == 0) {
          setFieldErrorMessages(prevState => ({
             ...prevState,
             passwordErrMsg: "The value should not be empty"
          }));
          flag = true;
       }
       return flag;
    }
 
    function serverErrorChecking() {
       authService.Login(usernameEmail, password)
       .then((response: any) => {
          if (response?.message) {
             setAuthMessage(response.message);
            //  setTimeout(() => {
                navigate('/Home');
            //   }, 3000);             
          } else {
             setFieldErrorMessages(prevState => ({
                ...prevState,
                ...response
             }));     
          }
       })
       .catch(err => {
         console.error('Error: ' + err);
       });
    }
 
    const handleSubmit = async (event: any) => {
       event.preventDefault();
 
       setFieldErrorMessages({
          usernameEmailErrMsg: null,
          passwordErrMsg: null,
       });
       
       if (!clientErrorChecking()) {
          serverErrorChecking();
       }
    };
 
    return (
       <>
          <Helmet>
             <meta charSet="utf-8"/>
             <title>Log In | DizaQute</title>
          </Helmet>
          <Navbar />
          <main className="LOG_IN_PAGE">
             {authMessage? (
                <div className="authMessage">
                   <p>{authMessage}</p>
                </div>            
             ) : (
                <form onSubmit={handleSubmit}>
                   <fieldset>
                      <legend>Log In</legend>
                      <div className="formFields">
                         <div className="dataField">
                            <p style={{maxHeight: fieldErrorMessages?.usernameEmailErrMsg? '2em' : '0'}}>{fieldErrorMessages?.usernameEmailErrMsg}</p>
                            <div className="inputField">
                               <input type="text" name="username" value={usernameEmail} onChange={(event) => setUsernameEmail(event.target.value)} placeholder=" " />
                               <label>Username or Email</label>
                            </div>
                         </div>
                         <div className="dataField">
                            <p style={{maxHeight: fieldErrorMessages?.passwordErrMsg? '2em' : '0'}}>{fieldErrorMessages?.passwordErrMsg}</p>
                            <div className="inputField">
                               <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder=" " />
                               <label>Password</label>
                            </div>
                         </div>
                         {/* <GoogleReCaptcha onVerify={token => setCaptchaToken(token)} /> */}
                         <div className="dataSubmit">
                            <input type="submit" value="Log In" />
                         </div>
                         <Link to="/Restore_account" className="RestoreAccount">
                           <p>Forgot password?</p>
                         </Link>
                         <hr />
                         <div className="externalAuthorization">
                            <button type="button" className="gAuthorization">
                               <img src={require("../images/Google.png")} alt="G"/>
                            </button>
                         </div>
                         <hr />
                         <Link to="/Signup">
                            Sign Up to account
                         </Link>
                      </div>
                   </fieldset>
                </form>
             )}
          </main>
       </>
    )
 }

export { LoginPage };