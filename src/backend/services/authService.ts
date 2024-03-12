import axios from 'axios';
import { store } from '../../ReduxStore/store';

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
                } else {
                    result = res.data || [];
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
    // isAuth: async () => {
    // },    
    isAuth: async () => {
        try {
            const userAccessTokenString = localStorage.getItem('AccessToken');
            const headers: { [key: string]: string } = {};
        
            if (userAccessTokenString !== null) {
                const userAccessToken = JSON.parse(userAccessTokenString);
                headers['Authorization'] = 'Bearer ' + userAccessToken;
            }
        
            const res = await axios.get(`/Authentication/Auth`, {headers}).catch(() => {
                AuthService.Logout();
                return null;
            });
        
            if (!res) {
                return false;
            }
        
            if (res?.data.accessToken) {
                localStorage.setItem('AccessToken', JSON.stringify(res.data.accessToken));
            }
        
            if (res?.status === 200) {
                return true;
            } else {
                AuthService.Logout();
                return false;
            }
        
        } catch (error) {
            AuthService.Logout();
            return false;
        }
    },
    Logout: async () => {
        const res = await axios.get(`/Authentication/Logout`);
        localStorage.removeItem('AccessToken');
        return res.data || [];
    }
}

export default AuthService;