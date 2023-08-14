import axios from 'axios';

const AuthenticationService = {
    postLoginData: async (username: string, password: string) => {
        const data = {
            Username: username,
            Password: password
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        const res = await axios.post(`/Authentication/Login`, data, { headers });
        return res.data || []
    }
}

export default AuthenticationService;