interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function allNewsData(state = initialState, action: Action) {
    switch (action.type) {
        case 'ALL_NEWS_DATA':
            return action.payload;
        default:
            return state;
    }
}