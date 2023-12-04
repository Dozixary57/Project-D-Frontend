interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function filteredItemsData(state = initialState, action: Action) {
    switch (action.type) {
        case 'FILTERED_ITEMS_DATA':
            return action.payload;
        default:
            return state;
    }
}