import { IObjectInfo } from '@interfaces/IObjectsData';
import { GetCurrentUserAccessTokenString } from '@tools/GetUserData';
import { handleEditChanges } from '@tools/HandleEditChanges';
import axios from 'axios';
import { store } from 'ReduxStore/store';

const ObjectsService = {
  getObjects: async (collection: string) => {
    let result: any[] = [];
    await axios.get(`/${collection}`, { timeout: 5000 })
      .then((res) => {
        result = res.data || [];
      })
      .catch(error => {
        console.log(error);
      });
    return result;
  },
  getObjectByTitle: async (collection: string, titleId: string | undefined) => {
    try {
      console.log(`${collection} - ${titleId}`)
      await axios.get(`/${collection}/${titleId}`).then((res) => {
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
  },

  getObjectsCountList: async () => {
    try {
      await axios.get(`${process.env.REACT_APP_DATA_API}/Objects/CountList`)
        .then((res) => {
          store.dispatch({
            type: 'OBJECTS_COUNT_LIST',
            payload: res.data
          })
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
}

export default ObjectsService;