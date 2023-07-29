import axios from 'axios';

const AuthenticationService = {
    postSigninData: async (username: string, password: string) => {
        const data = {
            username: username,
            password: password
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.post(`/Authentication/Signin`, data, { headers });
    }
}

export default AuthenticationService;