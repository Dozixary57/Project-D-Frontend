interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function userPrivileges(state = initialState, action: Action) {
    switch (action.type) {
        case 'USER_PRIVILEGES':
            return action.payload;
        default:
            return state;
    }
}