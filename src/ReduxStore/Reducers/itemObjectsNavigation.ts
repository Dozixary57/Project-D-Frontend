//itemObjectNavigation
interface Action {
    type: string;
    payload: any;
}

const initialState = null;

export default function itemObjectsNavigationIndex(state = initialState, action: Action) {
    switch (action.type) {
        case 'ITEM_OBJECT_NAVIGATION_INDEX':
            return action.payload;
        default:
            return state;
    }
}