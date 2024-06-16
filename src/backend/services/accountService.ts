import axios from 'axios';
import { store } from '../../ReduxStore/store';

const AccountService = {
    getAccounts: async () => {
        let result: any[] = [];
        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.get(`/Accounts`, {headers, timeout: 5000})
            .then((res) => {
                result = res.data || [];
            }).catch(error => {
                console.log(error);
            }).finally( () => {
                store.dispatch({
                    type: 'IS_LOADING_STATE',
                    payload: false
                })
            }); 
        return result;
    },
    getAccountById: async (id: string | undefined) => {
        let res = await axios.get(`/Account/${id}`);
        return res.data || null;
    },
    getUserStatuses: async () => {
        let result: any[] = [];
        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.get(`/User/Statuses`, {headers, timeout: 5000})
            .then((res) => {
                result = res.data || [];
            }).catch(error => {
                console.log(error);
            }).finally( () => {
                store.dispatch({
                    type: 'IS_LOADING_STATE',
                    payload: false
                })
            }); 
        return result;
    },
    getUserPrivileges: async () => {
        let result: any[] = [];
        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.get(`/User/Privileges`, {headers, timeout: 5000})
            .then((res) => {
                result = res.data || [];
            }).catch(error => {
                console.log(error);
            }).finally( () => {
                store.dispatch({
                    type: 'IS_LOADING_STATE',
                    payload: false
                })
            }); 
        return result;
    },
    // getCurrentUserPrivileges: async (id: string | undefined) => {
    //     let result: any[] = [];
    //     const headers = {
    //         'Content-Type': 'application/json'
    //     };
    //     await axios.get(`/User/${id}/Privileges`, {headers, timeout: 5000})
    //         .then((res) => {
    //             result = res.data || [];
    //         }).catch(error => {
    //             console.log(error);
    //         }).finally( () => {
    //             store.dispatch({
    //                 type: 'IS_LOADING_STATE',
    //                 payload: false
    //             })
    //         }); 
    //     return result;
    // }
}

export default AccountService;