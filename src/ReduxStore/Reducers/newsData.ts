interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function newsData(state = initialState, action: Action) {
    switch (action.type) {
        case 'NEWS_DATA':
            return action.payload;
        default:
            return state;
    }
}