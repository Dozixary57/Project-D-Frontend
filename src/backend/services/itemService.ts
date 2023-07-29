import axios from 'axios';

const ItemService = {
    getItems: async () => {
        let res = await axios.get(`/Items`);
        return res.data || [];
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