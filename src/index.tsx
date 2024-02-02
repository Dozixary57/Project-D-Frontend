import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "./index.css"
import {ContextProvider} from "./ContextProvider";
import { Provider } from "react-redux";
import {store} from "./ReduxStore/store";
import {BetaLabel} from "./components/elements/BetaLabel/BetaLabel";
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <BetaLabel />
        <React.StrictMode>
            <Provider store={ store }>
                <ContextProvider>
                    <HelmetProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </HelmetProvider>
                </ContextProvider>
            </Provider>
        </React.StrictMode>
    </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
