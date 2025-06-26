import { IObjectInfo, IObjectsCountList } from '@interfaces/IObjectsData';
import { setObjectsData } from '@ReduxStore/Reducers/filtering/objectsFilteredResult';
import { CapitalizeFirstLetter } from '@tools/TextFormatter';
import axios from 'axios';
import { store } from 'ReduxStore/store';

const ObjectsService = {
  getObjects: async (collection: string) => {
    let result: any[] = [];
    await axios.get(`${process.env.REACT_APP_DATA_API}/${collection}`, { timeout: 5000 })
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
      await axios.get(`${process.env.REACT_APP_DATA_API}/${collection}/${titleId}`).then((res) => {
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
  updateObjectData: async (collection: string, data: IObjectInfo | null) => {
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
      await axios.put(`${process.env.REACT_APP_DATA_API}/${collection}/Update`, data, { headers, timeout: 5000 })
        .then((res) => {
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

  // getObjectsCountList: async () => {
  //   try {
  //     await axios.get(`${process.env.REACT_APP_DATA_API}/Objects/CountList`)
  //       .then((res) => {
  //         store.dispatch({
  //           type: 'OBJECTS_COUNT_LIST',
  //           payload: res.data
  //         })
  //       }).catch(error => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     store.dispatch({
  //       type: 'IS_LOADING_STATE',
  //       payload: false
  //     })
  //   }
  // },

  getObjectsCount: async (collection: string) => {
    try {
      await axios.get(`${process.env.REACT_APP_DATA_API}/Objects/Count/${collection}`)
        .then((res) => {
          store.dispatch({
            type: 'OBJECTS_COUNT_LIST',
            payload: { [collection]: res.data }
          });
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

  getObjectsByCategory: async (category: keyof IObjectsCountList) => {
    try {
      const categoryName = CapitalizeFirstLetter(category);
      await axios.get(`${process.env.REACT_APP_DATA_API}/Objects/${categoryName}`)
        .then((res) => {
          if (res && res.data && res.data[categoryName]) {
            store.dispatch(setObjectsData({
              [categoryName]: res.data[categoryName]
            }));
          }
        }).catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  },

  getObjectsByCriteria: async (criteria: any) => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      }

      store.dispatch({ type: 'IS_LOCAL_LOADING_STATE', payload: true })

      await axios.post(`${process.env.REACT_APP_DATA_API}/ObjectsByCriteria`, criteria, { headers })
        .then((res) => {
          if (res && res.data) {
            store.dispatch(setObjectsData({
              ...res.data
            }));
          }
        }).catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      store.dispatch({ type: 'IS_LOCAL_LOADING_STATE', payload: false })
    }
  },

  getObjectsSelectCategories: async () => {
    try {
      let result: { value: string, label: string }[] | null = null;
      await axios.get(`${process.env.REACT_APP_DATA_API}/Objects/SelectCategories`)
        .then((res) => {
          result = res.data;
        });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
}

export default ObjectsService;