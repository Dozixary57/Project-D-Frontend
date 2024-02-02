interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function oneNewsData(state = initialState, action: Action) {
    switch (action.type) {
        case 'ONE_NEWS_DATA':
            return action.payload;
        default:
            return state;
    }
}