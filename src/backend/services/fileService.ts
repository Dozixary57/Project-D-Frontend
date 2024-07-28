import axios from 'axios';
import AuthService from './authService';
import { GetCurrentUserAccessTokenString } from '../../components/GetUserData/GetUserData';
import { useAllowedFileProperties } from '../../AllowedValues/AllowedFileProperties';

const FileService = {
  getAvatarsInfo: async () => {
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
      });

    return result;
  },
  getAvatars: async () => {
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
      });

    return result;
  },
  // getAvatars: async () => {
  //   let cancelTokenSource: any = null;

  //   return async () => {
  //     // Если есть предыдущий источник отмены, отмените предыдущий запрос
  //     if (cancelTokenSource) {
  //       cancelTokenSource.cancel('Запрос отменен из-за нового запроса.');
  //     }

  //     // Создайте новый источник отмены
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
  //           console.log('Запрос отменен:', error.message);
  //         } else {
  //           console.log(error);
  //         }
  //       });

  //     return result;
  //   };
  // },
  uploadAvatar: async (data: any) => {
    await AuthService.isAuth();

    let result: any = null;

    if (data) {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
      };

      await axios.post(`${process.env.REACT_APP_AUTH_API}/Avatars`, data, { headers: headers, timeout: 5000 })
        .then((res) => {
          console.log(res);
          result = res.data || null;
        }).catch(error => {
          console.log(error);
        });
    }

    return result;
  },
}

export default FileService;