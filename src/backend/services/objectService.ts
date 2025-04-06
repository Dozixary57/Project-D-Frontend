import { IObjectInfo } from '@interfaces/IObjectInfo';
import { GetCurrentUserAccessTokenString } from '@tools/GetUserData';
import { handleEditChanges } from '@tools/HandleEditChanges';
import axios from 'axios';
import { store } from 'ReduxStore/store';

const ObjectService = {
  getItems: async () => {
    let result: any[] = [];
    await axios.get('/Items', { timeout: 5000 })
      .then((res) => {
        result = res.data || [];
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED') {
          // Обработка ошибки таймаута    
        } else {
          // Обработка других ошибок сети
        }
      });
    return result;
  },
  getObjectByTitle: async (titleId: string | undefined) => {
    try {
      await axios.get(`/Item/${titleId}`).then((res) => {
        if (res.data) {
          store.dispatch({
            type: 'OBJECT_INFO_DATA',
            payload: res.data
          })
        }
      });
    } catch (error) {
      console.log(error);
      store.dispatch({
        type: 'OBJECT_INFO_DATA',
        payload: null
      })
    }
  },
  updateObjectData: async (data: IObjectInfo | null) => {
    if (!data) return;

    store.dispatch({
      type: 'IS_LOADING_STATE',
      payload: true
    })

    const headers = {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + GetCurrentUserAccessTokenString()
    };
    try {
      await axios.put(`${process.env.REACT_APP_DATA_API}/Object/Update`, data, { headers, timeout: 5000 })
        .then((res) => {
          handleEditChanges(store.dispatch).resetAllStatesByDefault();
          if (res.data) {
            store.dispatch({
              type: 'OBJECT_INFO_DATA',
              payload: res.data
            })
          } else {
            store.dispatch({
              type: 'OBJECT_INFO_DATA',
              payload: null
            })
          }
        }).catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      store.dispatch({
        type: 'IS_LOADING_STATE',
        payload: false
      })
    }
  },
  getItemCoverUrl: async (titleId: string | undefined) => {
    let res = await axios.get(`/GridFS/Cover/${titleId}`);
    return res.data;
  }
}

export default ObjectService;