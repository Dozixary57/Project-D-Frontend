import axios from 'axios';
import { store } from '../../ReduxStore/store';

const NewsService = {
  getNewsTypes: async () => {
    let result: any[] = [];
    await axios.get(`${process.env.REACT_APP_DATA_API}/News_Types`, { timeout: 5000 })
      .then((res) => {
        result = res.data || [];
      }).catch(error => {
        if (error.code === 'ECONNABORTED') {
          // ...    
        } else {
          // ...    
        }
      }).finally(() => {
        store.dispatch({
          type: 'IS_LOADING_STATE',
          payload: false
        })
      });
    return result;
  },
  getAllNews: async () => {
    let result: any[] = [];
    await axios.get(`${process.env.REACT_APP_DATA_API}/All_News`, { timeout: 5000 })
      .then((res) => {
        result = res.data || [];
      }).catch(error => {
        if (error.code === 'ECONNABORTED') {
          // ...    
        } else {
          // ...    
        }
      }).finally(() => {
        store.dispatch({
          type: 'IS_LOADING_STATE',
          payload: false
        })
      });
    return result;
  },
  getOneNews: async (titleId: string | undefined) => {
    let result = null;
    await axios.get(`${process.env.REACT_APP_DATA_API}/One_News/${titleId}`, { timeout: 5000 })
      .then((res) => {
        result = res.data || null;
      }).catch(error => {
        if (error.code === 'ECONNABORTED') {
          // ...    
        } else {
          // ...    
        }
      }).finally(() => {
        store.dispatch({
          type: 'IS_LOADING_STATE',
          payload: false
        })
      });
    return result;
  }
}

export default NewsService;