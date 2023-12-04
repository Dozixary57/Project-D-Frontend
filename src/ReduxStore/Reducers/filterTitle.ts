interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function filterTitle(state = initialState, action: Action) {
    switch (action.type) {
        case 'FILTER_TITLE':
            return action.payload;
        default:
            return state;
    }
}