import React from 'react';
import './i18n';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "./index.scss"
import { Provider } from "react-redux";
import { store } from "./ReduxStore/store";
import { HelmetProvider } from 'react-helmet-async';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <React.StrictMode>
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            {/* <GoogleReCaptchaProvider reCaptchaKey="6LeLNIcpAAAAACc06g_220X6gT9WLA7KvdB0JFh4"> */}
            <App />
            {/* </GoogleReCaptchaProvider> */}
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </React.StrictMode>
  </>
);

serviceWorkerRegistration.register();

reportWebVitals();
