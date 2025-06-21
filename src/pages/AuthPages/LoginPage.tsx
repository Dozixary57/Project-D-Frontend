import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import authService from "@services/authService";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import styles from "./AuthStyles.module.scss"
import { useLastUrlSegment } from '@tools/UrlSegments';

interface IErrorMessages {
  usernameEmailErrMsg: string | null;
  passwordErrMsg: string | null;
}

const LoginPage = () => {
  const { t } = useTranslation();
  //  const [captchaToken, setCaptchaToken] = useState('');
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const lastSegment = useLastUrlSegment();

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
          navigate(-2);
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
    <div className={styles.AUTH_FORM}>
      {!authMessage ?
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>{lastSegment === 'Login' ? t('login.title') : t('signup.title')}</legend>
            <div className={styles.dataField}>
              <p style={{ maxHeight: fieldErrorMessages?.usernameEmailErrMsg ? '2em' : '0' }}>{fieldErrorMessages?.usernameEmailErrMsg}</p>
              <div className={styles.inputField}>
                <input type="text" name="username" value={usernameEmail} onChange={(event) => setUsernameEmail(event.target.value)} placeholder=" " />
                <label>{t('login.usernameOrEmail')}</label>
              </div>
            </div>
            <div className={styles.dataField}>
              <p style={{ maxHeight: fieldErrorMessages?.passwordErrMsg ? '2em' : '0' }}>{fieldErrorMessages?.passwordErrMsg}</p>
              <div className={styles.inputField}>
                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder=" " />
                <label>{t('login.password')}</label>
              </div>
            </div>
            {/* <GoogleReCaptcha onVerify={token => setCaptchaToken(token)} /> */}
            <div className={styles.dataSubmit}>
              <input type="submit" value={t('login.button')} />
            </div>
            {/* <Link to="/Restore_account">
              <p className={styles.RestoreAccount}>{t('login.forgotPassword')}</p>
            </Link> */}
            <hr />
            <Link to="/Signup">
              <p className={styles.ChangeAuthForm}>{t('login.signup')}</p>
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

export { LoginPage };