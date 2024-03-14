interface Action {
    type: string;
    payload: any;
}

const initialState = false;

export default function isAuthorized(state = initialState, action: Action) {
    switch (action.type) {
        case 'IS_AUTHORIZED':
            return action.payload;
        default:
            return state;
    }
}