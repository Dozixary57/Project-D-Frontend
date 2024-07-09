import axios from 'axios';
import { store } from '../../ReduxStore/store';
import { IAccount } from '../../Interfaces/IAccounts';
import AuthService from './authService';
import { GetCurrentUserAccessTokenString } from '../../components/GetUserData/GetUserData';

const AccountService = {
  getAccounts: async () => {
    let result: any[] = [];
    const headers = {
      'Content-Type': 'application/json'
    };
    await axios.get(`${process.env.REACT_APP_AUTH_API}/Accounts`, { headers, timeout: 5000 })
      .then((res) => {
        result = res.data || [];
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        store.dispatch({
          type: 'IS_LOADING_STATE',
          payload: false
        })
      });
    return result;
  },
  getAccountById: async (id: string | undefined) => {
    let res = await axios.get(`${process.env.REACT_APP_AUTH_API}/Account/${id}`);
    return res.data || null;
  },
  getUserTitles: async () => {
    let result: any[] = [];
    const headers = {
      'Content-Type': 'application/json'
    };
    await axios.get(`${process.env.REACT_APP_AUTH_API}/User/Titles`, { headers, timeout: 5000 })
      .then((res) => {
        result = res.data || [];
      }).catch(error => {
        console.log(error);
      }).finally(() => {
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
    await axios.get(`${process.env.REACT_APP_AUTH_API}/User/Privileges`, { headers, timeout: 5000 })
      .then((res) => {
        result = res.data || [];
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        store.dispatch({
          type: 'IS_LOADING_STATE',
          payload: false
        })
      });
    return result;
  },
  createUserAccount: async (data: any): Promise<string | null> => {
    await AuthService.isAuth();
    let result: string = '/0';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
    };
    await axios.post(`${process.env.REACT_APP_AUTH_API}/Account/:id`, data, { headers, withCredentials: true, timeout: 5000 })
      .then((res) => {
        if (res.data.msg) {
          const { msg, ...resData } = res.data;
          result = resData._id || null;
        } else {
          result = res.data._id || null;
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        store.dispatch({
          type: 'IS_LOADING_STATE',
          payload: false
        })
      });

    return result;
  },
  updateUserAccount: async (data: any): Promise<IAccount | null> => {
    let result: IAccount | null = null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
    };
    await axios.put(`${process.env.REACT_APP_AUTH_API}/Account/Update`, data, { headers, timeout: 5000 })
      .then((res) => {
        if (res.data.msg) {
          const { msg, ...resData } = res.data;
          result = resData.Account || null;
        } else {
          result = res.data.Account || null;
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        store.dispatch({
          type: 'IS_LOADING_STATE',
          payload: false
        })
      });

    return result;
  },
  deleteUserAccount: async (id: string | undefined) => {
    await AuthService.isAuth();
    let result: any = null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
    };
    await axios.delete(`${process.env.REACT_APP_AUTH_API}/Account/${id}`, { headers, timeout: 5000 })
      .then((res) => {
        if (res.data) {
          result = res.data;
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
      });

    return result;
  },
  restoreUserAccount: async (id: string | undefined) => {
    await AuthService.isAuth();
    let result: any = null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
    };
    await axios.put(`${process.env.REACT_APP_AUTH_API}/Account/${id}`, {}, { headers, timeout: 5000 })
      .then((res) => {
        if (res.data) {
          result = res.data;
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
      });

    return result;
  }
  // deleteUserAccountPermanently: async (id: string | undefined) => {
  //   await AuthService.isAuth();
  //   let result: any = null;
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
  //   }
  //   await axios.delete(`${process.env.REACT_APP_AUTH_API}/Account/${id}`, { headers, timeout: 5000 })
  //     .then((res) => {
  //       if (res.data) {
  //         result = res.data;
  //       }
  //     }).catch(error => {
  //       console.log(error);
  //     }).finally(() => {
  //   });

  //   return result;
  // },
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