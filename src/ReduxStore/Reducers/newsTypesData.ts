interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function newsTypesData(state = initialState, action: Action) {
    switch (action.type) {
        case 'NEWS_TYPES_DATA':
            return action.payload;
        default:
            return state;
    }
}