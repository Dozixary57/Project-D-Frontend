import axios from 'axios';
import { store } from '../../ReduxStore/store';

const AuthService = {
    Login: async (login: string, password: string) => {
        const data = {
            Login: login,
            Password: password
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        const res = await axios.post(`/Authentication/Login`, data, {headers});
        if (res.data.accessToken) {
            localStorage.setItem('AccessToken', JSON.stringify(res.data.accessToken))
        }
        const { accessToken, ...responseData } = res.data;
        return responseData || [];
    },
    Signup: async (username: string, email: string, dateOfBirth: string, password: string) => {
        let result: any[] = [];
        const data = {
            Username: username,
            Email: email,
            DateOfBirth: dateOfBirth,
            Password: password
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.post(`/Authentication/Signup`, data, {headers, timeout: 5000})
            .then((res) => {
                result = res.data || [];
            }).catch(error => {
                if (error.code === 'ECONNABORTED') {
                    // Обработка ошибки таймаута    
                } else {
                    // Обработка других ошибок сети
                }
            }).finally( () => {
                // store.dispatch({
                //     type: 'DATA_LOADING_STATE',
                //     payload: false
                // })
            });
        return result;
    },
/*    authHeader: async () => {
        const userAccessTokenString = localStorage.getItem('AccessToken');
        if (userAccessTokenString !== null) {
            const userAccessToken = JSON.parse(userAccessTokenString);
            const headers = {
                'Authorization': 'Bearer' + userAccessToken.accessToken
            };
            const res = await axios.get(`/...`, {headers});
            return res.data || [];
        } else {
            return { msg: 'Nothing.'}
        }
    },*/
    Logout: async () => {
        const res = await axios.get(`/Authentication/Logout`);
        localStorage.removeItem('accessToken');
        return res.data || [];
    }
}

export default AuthService;