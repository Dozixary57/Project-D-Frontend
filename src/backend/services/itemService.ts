import axios from 'axios';

const ItemService = {
    getItems: async () => {
        let result: any[] = [];
        await axios.get('/Items', { timeout: 5000 })
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
    getItemByTitle: async (titleId: string | undefined) => {
        let res = await axios.get(`/Item/${titleId}`);
        return res.data || [];
    },
    getItemCoverUrl: async (titleId : string | undefined) => {
        let res = await axios.get(`/GridFS/Cover/${titleId}`);
        return res.data;
    }
}

export default ItemService;