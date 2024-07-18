import axios from 'axios';
import AuthService from './authService';
import { GetCurrentUserAccessTokenString } from '../../components/GetUserData/GetUserData';

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
  uploadAvatar: async (data: any) => {
    await AuthService.isAuth();

    let result: any = null;

    if (data) {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
      };

      const formData = new FormData();
      formData.append('file', data);

      await axios.post(`${process.env.REACT_APP_AUTH_API}/Avatars`, data, { headers: headers, timeout: 5000 })
        .then((res) => {
          result = res.data || null;
        }).catch(error => {
          console.log(error);
        });
    }

    return result;
  },
}

export default FileService;