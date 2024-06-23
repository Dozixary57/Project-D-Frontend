﻿import axios from 'axios';
import { store } from '../../ReduxStore/store';
import { jwtDecode } from "jwt-decode";

const AuthService = {
    Login: async (usernameEmail: string, password: string) => {
        let result: any[] = [];
        const data = {
            UsernameEmail: usernameEmail,
            Password: password
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.post(`/Authentication/Login`, data, {headers, timeout: 5000})
            .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem('AccessToken', JSON.stringify(res.data.accessToken))
                    const { accessToken, ...resData } = res.data;
                    result = resData || [];
                }
                result = res.data || [];
                if (res?.status === 200) {
                    store.dispatch({
                        type: 'IS_AUTHORIZED',
                        payload: true
                    });
                    AuthService.getUserPrivileges();
                }
            }).catch(error => {
                store.dispatch({
                    type: 'IS_AUTHORIZED',
                    payload: false
                });
                if (error.code === 'ECONNABORTED') {
                    // Обработка ошибки таймаута    
                } else {
                    // Обработка других ошибок сети
                }
                if (error.response.data) {
                    result = error.response.data;
                }
            }).finally( () => {
                // store.dispatch({
                //     type: 'DATA_LOADING_STATE',
                //     payload: false
                // })
            }); 
            // console.log(result)       
        return result;
    },
    Signup: async (username: string, email: string, dateOfBirth: string, password: string, captchaToken: string) => {
        let result: any[] = [];
        const data = {
            Username: username,
            Email: email,
            DateOfBirth: dateOfBirth,
            Password: password,
            CaptchaToken: captchaToken
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.post(`/Authentication/Signup`, data, {headers, timeout: 5000})
            .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem('AccessToken', JSON.stringify(res.data.accessToken))
                    const { accessToken, ...resData } = res.data;
                    result = resData || [];
                } else {
                    result = res.data || [];
                }
                if (res?.status === 200) {
                    store.dispatch({
                        type: 'IS_AUTHORIZED',
                        payload: true
                    });
                }
                // console.log(res)
                // console.log(res.data)
                // console.log(res.data.accessToken)
            }).catch(error => {
                if (error.code === 'ECONNABORTED') {
                    // Обработка ошибки таймаута    
                } else {
                    // Обработка других ошибок сети
                }
                console.log(error)
            }).finally( () => {
                // store.dispatch({
                //     type: 'DATA_LOADING_STATE',
                //     payload: false
                // })
            });        
        return result;
    },
    isAuth: async () => {
        try {
            const userAccessTokenString = localStorage.getItem('AccessToken');
            const headers: { [key: string]: string } = {};
        
            if (userAccessTokenString !== null && userAccessTokenString.length > 0) {
                const userAccessToken = JSON.parse(userAccessTokenString);
                headers['Authorization'] = 'Bearer ' + userAccessToken;
            }
        
            const res = await axios.get(`/Authentication/Auth`, {headers, timeout: 8000}).catch(() => {   
                AuthService.Logout();           
                return null;
            });
        
            if (res?.status !== 200 && !res) {
                // console.log('No res!')
                // AuthService.Logout();
                return 'Failure';
            }
        
            if (res?.data.accessToken) {
                localStorage.setItem('AccessToken', JSON.stringify(res.data.accessToken));
            }
        
            if (res?.status === 200) {
                store.dispatch({
                    type: 'IS_AUTHORIZED',
                    payload: true
                });
                AuthService.getUserPrivileges();
                return;
            } else {
                AuthService.Logout();
                return;
            }
        
        } catch (error) {
            AuthService.Logout();
            return;
        }
    },
    getUserPrivileges: async () => {
        const storedAccessToken = localStorage.getItem('AccessToken');

        if (storedAccessToken) {
            const accessToken = JSON.parse(storedAccessToken);
            
            const decodedToken: any = jwtDecode(accessToken);

            // console.log(decodedToken);

            store.dispatch({
                type: 'USER_PRIVILEGES',
                payload: decodedToken.Privileges ?? null
            });

            // console.log(decodedToken.privileges);
        }
    },
    Logout: async () => {
        let res;
        try {
            res = await axios.get(`/Authentication/Logout`, {timeout: 5000});
            return res.data || [];    
        } catch (e) {
            console.log(e);
        } finally {
            store.dispatch({
                type: 'IS_AUTHORIZED',
                payload: false
            });
            localStorage.removeItem('AccessToken');
            return "";    
        }        
    }
}

export default AuthService;