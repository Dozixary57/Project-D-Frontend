import axios from 'axios';

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
/*    Signup: async (username: string, email: string, dateOfBirth: string, password: string, ssi: boolean) => {
        const data = {
            Username: username,
            Email: email,
            DateOfBirth: dateOfBirth,
            Password: password,
            SSI: ssi
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        const res = await axios.post(`/Authentication/Signup`, data, {headers});
        return res.data || [];
    },*/
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
        localStorage.removeItem('accessToken')
        const res = await axios.get(`/Authentication/Logout`);
        return res.data || []
    }
}

export default AuthService;