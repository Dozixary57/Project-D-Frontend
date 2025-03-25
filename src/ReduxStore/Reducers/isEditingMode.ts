interface Action {
    type: string;
    payload: any;
}

const initialState = false;

export default function isEditingMode(state = initialState, action: Action) {
    switch (action.type) {
        case 'IS_EDITING_MODE':
            return action.payload;
        default:
            return state;
    }
}