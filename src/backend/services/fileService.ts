import axios from 'axios';
import AuthService from './authService';
import { GetCurrentUserAccessTokenString } from '@tools/GetUserData';
import { useAllowedFileProperties } from '../../AllowedValues/AllowedFileProperties';
import { store } from '../../ReduxStore/store';

const startDataLoading = () => {
  store.dispatch({
    type: 'IS_LOADING_STATE',
    payload: true
  })
};
const stopDataLoading = () => {
  store.dispatch({
    type: 'IS_LOADING_STATE',
    payload: false
  })
};

const FileService = {
  getAvatarsInfo: async () => {
    startDataLoading();
    let result: any = null;
    const headers = {
      'Content-Type': 'application/json'
    };
    await axios.get(`${process.env.REACT_APP_AUTH_API}/Avatars_info`, { headers, timeout: 5000 })
      .then((res) => {
        result = res.data.file || null;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        stopDataLoading();
      });

    return result;
  },
  getAvatars: async () => {
    startDataLoading();
    let result: any = null;
    const headers = {
      'Content-Type': 'application/json'
    };
    await axios.get(`${process.env.REACT_APP_AUTH_API}/Avatars`, { headers, timeout: 100000 })
      .then((res) => {
        result = res.data || null;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        stopDataLoading();
      });

    return result;
  },
  getAvatar: async (filename: string) => {
    startDataLoading();
    let result: any = null;
    const headers = {
      'Content-Type': 'application/json'
    };
    await axios.get(`${process.env.REACT_APP_AUTH_API}/Avatar/${filename}`, { headers, timeout: 100000 })
      .then((res) => {
        result = res.data || null;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        stopDataLoading();
      });

    return result;
  },
  syncImagesStorage: async (filename: string) => {
    startDataLoading();
    let result: any = null;
    const headers = {
      'Content-Type': 'application/json'
    };
    await axios.get(`${process.env.REACT_APP_AUTH_API}/SyncImagesStorage/${filename}`, { headers, timeout: 5000 })
      .then((res) => {
        result = res.data || null;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        stopDataLoading();
      });

    return result;
  },
  // getAvatars: async () => {
  //   let cancelTokenSource: any = null;

  //   return async () => {
  //     if (cancelTokenSource) {
  //       cancelTokenSource.cancel('Request canceled due to new request.');
  //     }

  //     cancelTokenSource = axios.CancelToken.source();

  //     let result: any = null;
  //     const headers = {
  //       'Content-Type': 'application/json'
  //     };

  //     await axios.get(`${process.env.REACT_APP_AUTH_API}/Avatars`, {
  //       headers,
  //       timeout: 10000,
  //       cancelToken: cancelTokenSource.token
  //     })
  //       .then((res) => {
  //         result = res.data || null;
  //       })
  //       .catch(error => {
  //         if (axios.isCancel(error)) {
  //           console.log('Request canceled:', error.message);
  //         } else {
  //           console.log(error);
  //         }
  //       });

  //     return result;
  //   };
  // },
  uploadAvatar: async (data: any) => {
    startDataLoading();
    await AuthService.isAuth();

    let result: any = null;

    if (data) {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
      };

      await axios.post(`${process.env.REACT_APP_AUTH_API}/Avatars`, data, { headers: headers, timeout: 5000 })
        .then((res) => {
          result = res.data || null;
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          stopDataLoading();
        });
    }

    return result;
  },
}

export default FileService;