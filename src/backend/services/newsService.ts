import axios from 'axios';
import { store } from '../../ReduxStore/store';

const NewsService = {
    getNewsTypes: async () => {
        let result: any[] = [];
        await axios.get('/Data/News_Types', { timeout: 5000 })
            .then((res) => {
                result = res.data || [];
            }).catch(error => {
                if (error.code === 'ECONNABORTED') {
                    // Обработка ошибки таймаута    
                } else {
                    // Обработка других ошибок сети
                }
            }).finally( () => {
                store.dispatch({
                    type: 'IS_LOADING_STATE',
                    payload: false
                })
            });
        return result;
    },
    getAllNews: async () => {
        let result: any[] = [];
        await axios.get('/Data/All_News', { timeout: 5000 })
            .then((res) => {
                result = res.data || [];
            }).catch(error => {
                if (error.code === 'ECONNABORTED') {
                    // Обработка ошибки таймаута    
                } else {
                    // Обработка других ошибок сети
                }
            }).finally( () => {
                store.dispatch({
                    type: 'IS_LOADING_STATE',
                    payload: false
                })
            });
        return result;
    },
    getOneNews: async (titleId: string | undefined) => {
        let result = null;
        let res = await axios.get(`/One_News/${titleId}`, { timeout: 5000 })
            .then((res) => {
                result = res.data || null;
            }).catch(error => {
                if (error.code === 'ECONNABORTED') {
                    // Обработка ошибки таймаута    
                } else {
                    // Обработка других ошибок сети
                }
            }).finally( ()=> {
                store.dispatch({
                    type: 'IS_LOADING_STATE',
                    payload: false
                })
            });
        return result;
    }
}

export default NewsService;