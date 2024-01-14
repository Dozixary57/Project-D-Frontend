interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function filterTitle(state = initialState, action: Action) {
    switch (action.type) {
        case 'SEARCH_TITLE_ID':
            return action.payload;
        default:
            return state;
    }
}