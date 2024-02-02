interface Action {
    type: string;
    payload: any;
}

const initialState = false;

export default function dataLoadingState(state = initialState, action: Action) {
    switch (action.type) {
        case 'DATA_LOADING_STATE':
            return action.payload;
        default:
            return state;
    }
}