import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/elements/navigation_bar/Navbar";
import "./SignupPage.scss"
import {useState, useEffect, useRef} from "react";
import authService from "../backend/services/authService";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import {GoogleReCaptchaProvider, GoogleReCaptcha} from "react-google-recaptcha-v3";

interface IErrorMessages { 
   usernameErrMsg: string | null;
   emailErrMsg: string | null;
   passwordErrMsg: string | null;
   confirmPasswordErrMsg: string | null;
   dateOfBirthErrMsg: string | null;
   agreementsErrMsg: string | null;
 } 

const SingupPage = () => {
   const [captchaToken, setCaptchaToken] = useState('');
   const [authMessage, setAuthMessage] = useState<string | null>(null);

   const navigate = useNavigate();

   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');

   const [dateOfBirth, setDateOfBirth] = useState<string>('');
   const [showDatePicker, setShowDatePicker] = useState(false);

   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [agreementsCheckbox, setAgreementsCheckbox] = useState<boolean>(false);

   const [fieldErrorMessages, setFieldErrorMessages] = useState<IErrorMessages>({
      usernameErrMsg: null,
      emailErrMsg: null,
      passwordErrMsg: null,
      confirmPasswordErrMsg: null,
      dateOfBirthErrMsg: null,
      agreementsErrMsg: null,
   });
   
   useEffect(() => {
      if (username.length > 0) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            usernameErrMsg: null
         }));
      }
   }, [username]);
   useEffect(() => {
      if (email.length > 0) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            emailErrMsg: null
         }));
      }
   }, [email]);
   useEffect(() => {
      if (password.length > 0) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            passwordErrMsg: null
         }));
      }
   }, [password]);
   useEffect(() => {
      if (confirmPassword.length > 0) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            confirmPasswordErrMsg: null
         }));
      }
   }, [confirmPassword]);
   // useEffect(() => {
   //    if (dateOfBirth.length > 0) {
   //       setFieldErrorMessages(prevState => ({
   //          ...prevState,
   //          confirmPasswordErrMsg: null
   //       }));
   //    }
   // }, [dateOfBirth]);
   useEffect(() => {
      if (agreementsCheckbox) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            agreementsErrMsg: null
         }));
      }
   }, [agreementsCheckbox])

   function clientErrorChecking() {
      let flag = false;
      if (username.length == 0) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            usernameErrMsg: "The value should not be empty"
         }));
         flag = true;
      }
      if (email.length == 0) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            emailErrMsg: "The value should not be empty"
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
      if (confirmPassword != password) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            confirmPasswordErrMsg: "Passwords must match"
         }));
         flag = true;
      } else if (confirmPassword.length == 0) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            confirmPasswordErrMsg: "The value should not be empty"
         }));
         flag = true;
      }
      if (!agreementsCheckbox) {
         setFieldErrorMessages(prevState => ({
            ...prevState,
            agreementsErrMsg: "It is necessary to accept"
         }));
         flag = true;
      }
      return flag;
   }

   function serverErrorChecking() {
      const res = authService.Signup(username, email, dateOfBirth, confirmPassword, captchaToken)
      .then((serviceData: any) => {
         if (serviceData?.message) {
            setAuthMessage(serviceData.message);
            setTimeout(() => {
               navigate('/Home');
             }, 3000);             
         } else {
            setFieldErrorMessages(prevState => ({
               ...prevState,
               ...serviceData
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
         usernameErrMsg: null,
         emailErrMsg: null,
         passwordErrMsg: null,
         confirmPasswordErrMsg: null,
         dateOfBirthErrMsg: null,
         agreementsErrMsg: null,
      });
      
      if (!clientErrorChecking()) {
         serverErrorChecking();
      }
   };

   return (
      <>
         <Helmet>
            <meta charSet="utf-8"/>
            <title>Sign Up | DizaQute</title>
         </Helmet>
         <Navbar/>
         <main className="SIGN_UP_PAGE">
            {authMessage? (
               <div className="authMessage">
                  <p>{authMessage}</p>
               </div>            
            ) : (
               <form id="Signup" onSubmit={handleSubmit}>
                  <fieldset>
                     <legend>Sign Up</legend>
                     <div className="formFields">
                        <div className="dataField">
                           <p style={{maxHeight: fieldErrorMessages?.usernameErrMsg? '2em' : '0'}}>{fieldErrorMessages?.usernameErrMsg}</p>
                           <div className="inputField">
                              <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder=" " />
                              <label>Username<span> ̊ </span></label>
                           </div>
                        </div>
                        <div className="dataField">
                           <p style={{maxHeight: fieldErrorMessages?.emailErrMsg? '2em' : '0'}}>{fieldErrorMessages?.emailErrMsg}</p>
                           <div className="inputField">
                              <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder=" " />
                              <label>Email<span> ̊ </span></label>
                           </div>
                        </div>
                        <div className="dataField">
                           <p style={{maxHeight: fieldErrorMessages?.passwordErrMsg? '2em' : '0'}}>{fieldErrorMessages?.passwordErrMsg}</p>
                           <div className="inputField">
                              <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder=" " />
                              <label>Password<span> ̊ </span></label>
                           </div>
                        </div>
                        <div className="dataField">
                           <p style={{maxHeight: fieldErrorMessages?.confirmPasswordErrMsg? '2em' : '0'}}>{fieldErrorMessages?.confirmPasswordErrMsg}</p>
                           <div className="inputField">
                              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder=" " />
                              <label>Confirm Password<span> ̊ </span></label>
                           </div>
                        </div>
                        <div className="dataField">
                           <p style={{maxHeight: fieldErrorMessages?.dateOfBirthErrMsg? '2em' : '0'}}>{fieldErrorMessages?.dateOfBirthErrMsg}</p>
                           <div className="inputField">
                              {showDatePicker || dateOfBirth ? (
                                 <input type="date" name="date" value={dateOfBirth || ''} onChange={(event) => setDateOfBirth(event.target.value)} onBlur={() => setShowDatePicker(false)} placeholder=" " className="datePicker" />
                              ) : (
                                 <input type="text" value={dateOfBirth || ''} onFocus={() => setShowDatePicker(true)} onChange={(event) => setDateOfBirth(event.target.value)} placeholder=" " />
                              )}
                              <label>Date of Birth</label>
                           </div>                     
                        </div>
                        {/* <GoogleReCaptcha onVerify={token => setCaptchaToken(token)} /> */}
                        <div className="dataSubmit">
                           <input type="submit" value="Sign Up" />
                        </div>
                        <div className="agreements">
                           <p style={{maxHeight: fieldErrorMessages?.agreementsErrMsg? '2em' : '0'}}>{fieldErrorMessages?.agreementsErrMsg}</p>
                           <p className="agreements" onClick={() => setAgreementsCheckbox(prev => !prev)}>
                              <input type="button" className={agreementsCheckbox? `FilterOptionOn` : `FilterOptionOff`} />
                              I got acquainted with <span onClick={() => navigate('/Agreements')}>PRIVACY NOTICE</span> and <span onClick={() => navigate('/Agreements')}>TERMS OF SERVICE</span>, and  I give my consent to the processing of personal data.
                           </p>
                        </div>
                        <hr />
                        <div className="externalAuthorization">
                           <button type="button" className="gAuthorization">
                              <img src={require("../images/Google.png")} alt="G"/>
                           </button>
                        </div>
                        <hr />
                        <Link to="/Login">
                           Log in to account
                        </Link>
                     </div>
                  </fieldset>
               </form>
            )}
         </main>
      </>
   )
}

export { SingupPage };