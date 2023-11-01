//navigationItemsList

interface Action {
    type: string;
    payload: any;
}

const initialState:string[] = [];

export default function navigationItemsList(state = initialState, action: Action) {
    switch (action.type) {
        case 'NAVIGATION_ITEMS_LIST':
            return action.payload;
        default:
            return state;
    }
}