interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function itemsData(state = initialState, action: Action) {
    switch (action.type) {
        case 'ITEMS_DATA':
            return action.payload;
        default:
            return state;
    }
}