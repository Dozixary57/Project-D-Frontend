// import { IObjectInfo } from '@interfaces/IObjectsData';
import { GetCurrentUserAccessTokenString } from '@tools/GetUserData';
import axios from 'axios';
import AuthService from './authService';
// import { store } from 'ReduxStore/store';

const IdeasService = {
  getIdeas: async () => {
    let result: any[] = [];

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
    };

    try {
      await axios.get(`${process.env.REACT_APP_DATA_API}/Ideas`, { headers, timeout: 5000 })
        .then((res) => {
          result = res.data || [];
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    return result;
  },
  // getObjectByTitle: async (collection: string, titleId: string | undefined) => {
  //   try {
  //     await axios.get(`${process.env.REACT_APP_DATA_API}/${collection}/${titleId}`).then((res) => {
  //       if (res.data) {
  //         store.dispatch({
  //           type: 'OBJECT_INFO_DATA',
  //           payload: res.data
  //         })
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     store.dispatch({
  //       type: 'OBJECT_INFO_DATA',
  //       payload: null
  //     })
  //   }
  // },
  submitIdeaVote: async (ideaId: string, vote: 1 | -1 | null) => {
    await AuthService.isAuth();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
    };
    try {
      let result: any = null;

      await axios.post(`${process.env.REACT_APP_DATA_API}/Idea/Vote`, { ideaId, vote }, { headers, timeout: 5000 })
        .then((res) => {
          if (res.data) {
            result = res.data;
          } else {
          }
        }).catch(error => {
          console.log(error);
        });

      return result;
    } catch (error) {
      console.log(error);
    } finally {
    }
  },
  // updateIdeaVote: async (ideaId: string, voteType: "upvote" | "downvote" | null) => {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
  //   };
  //   try {
  //     await axios.put(`${process.env.REACT_APP_DATA_API}/Ideas/${ideaId}`, { voteType }, { headers, timeout: 5000 })
  //       .then((res) => {
  //         if (res.data) {
  //         } else {
  //         }
  //       }).catch(error => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // },
}

export default IdeasService;