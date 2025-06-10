import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import authService from "@services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import {GoogleReCaptchaProvider, GoogleReCaptcha} from "react-google-recaptcha-v3";
// import "./SignupPage.scss"
import styles from "./AuthStyles.module.scss"
import { useLastUrlSegment } from '@tools/LastUrlSegment';

interface IErrorMessages {
  usernameErrMsg: string | null;
  emailErrMsg: string | null;
  passwordErrMsg: string | null;
  confirmPasswordErrMsg: string | null;
  dateOfBirthErrMsg: string | null;
  agreementsErrMsg: string | null;
}

const SignupPage = () => {
  const { t } = useTranslation();
  const [captchaToken, setCaptchaToken] = useState('');
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const lastSegment = useLastUrlSegment();

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
    <div className={styles.AUTH_FORM}>
      {!authMessage ?
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>{lastSegment === 'Login' ? t('login.title') : t('signup.title')}</legend>
            <div className={styles.dataField}>
              <p style={{ maxHeight: fieldErrorMessages?.usernameErrMsg ? '2em' : '0' }}>{fieldErrorMessages?.usernameErrMsg}</p>
              <div className={styles.inputField}>
                <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder=" " />
                <label>{t('signup.username')}<span> ̊ </span></label>
              </div>
            </div>
            <div className={styles.dataField}>
              <p style={{ maxHeight: fieldErrorMessages?.emailErrMsg ? '2em' : '0' }}>{fieldErrorMessages?.emailErrMsg}</p>
              <div className={styles.inputField}>
                <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder=" " />
                <label>{t('signup.email')}<span> ̊ </span></label>
              </div>
            </div>
            <div className={styles.dataField}>
              <p style={{ maxHeight: fieldErrorMessages?.passwordErrMsg ? '2em' : '0' }}>{fieldErrorMessages?.passwordErrMsg}</p>
              <div className={styles.inputField}>
                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder=" " />
                <label>{t('signup.password')}<span> ̊ </span></label>
              </div>
            </div>
            <div className={styles.dataField}>
              <p style={{ maxHeight: fieldErrorMessages?.confirmPasswordErrMsg ? '2em' : '0' }}>{fieldErrorMessages?.confirmPasswordErrMsg}</p>
              <div className={styles.inputField}>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder=" " />
                <label>{t('signup.confirmPassword')}<span> ̊ </span></label>
              </div>
            </div>
            <div className={styles.dataField}>
              <p style={{ maxHeight: fieldErrorMessages?.dateOfBirthErrMsg ? '2em' : '0' }}>{fieldErrorMessages?.dateOfBirthErrMsg}</p>
              <div className={styles.inputField}>
                {showDatePicker || dateOfBirth ? (
                  <input type="date" name="date" value={dateOfBirth || ''} onChange={(event) => setDateOfBirth(event.target.value)} onBlur={() => setShowDatePicker(false)} placeholder=" " className="datePicker" />
                ) : (
                  <input type="text" value={dateOfBirth || ''} onFocus={() => setShowDatePicker(true)} onChange={(event) => setDateOfBirth(event.target.value)} placeholder=" " />
                )}
                <label>{t('signup.dateOfBirth')}</label>
              </div>
            </div>
            {/* <GoogleReCaptcha onVerify={token => setCaptchaToken(token)} /> */}
            <div className={styles.dataSubmit}>
              <input type="submit" value={t('signup.button')} />
            </div>
            <div className={styles.agreements}>
              <p style={{ maxHeight: fieldErrorMessages?.agreementsErrMsg ? '2em' : '0' }}>{fieldErrorMessages?.agreementsErrMsg}</p>
              <p className={styles.agreements} onClick={() => setAgreementsCheckbox(prev => !prev)}>
                <input type="button" className={agreementsCheckbox ? styles.FilterOptionOn : styles.FilterOptionOff} />
                {t('signup.agreement')}
              </p>
            </div>
            <hr />
            <Link to="/Login">
              <p className={styles.ChangeAuthForm}>{t('signup.login')}</p>
            </Link>
          </fieldset>
        </form>
        :
        <div className={styles.authMessage}>
          <p>{authMessage}</p>
        </div>
      }
    </div>
  )
}

export { SignupPage };