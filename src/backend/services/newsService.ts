import axios from 'axios';

const NewsService = {
    getNewsTypes: async () => {
        let result: any[] = [];
        await axios.get('/Data/News_Types', { timeout: 5000 })
            .then((res) => {
                result = res.data || [];            })
            .catch(error => {
                if (error.code === 'ECONNABORTED') {
                    // Обработка ошибки таймаута    
                } else {
                    // Обработка других ошибок сети
                }
            });
        return result;
    },
    getAllNews: async () => {
        let result: any[] = [];
        await axios.get('/Data/All_News', { timeout: 5000 })
            .then((res) => {
                result = res.data || [];            })
            .catch(error => {
                if (error.code === 'ECONNABORTED') {
                    // Обработка ошибки таймаута    
                } else {
                    // Обработка других ошибок сети
                }
            });
        return result;
    }
}

export default NewsService;