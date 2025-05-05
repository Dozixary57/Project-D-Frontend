import { IObjectInfo } from "@interfaces/IObjectsData";

interface Action {
    type: string;
    payload: IObjectInfo | null;
}

const initialState: IObjectInfo | null = null;

export default function newObjectInfoData(state: IObjectInfo | null = initialState, action: Action): IObjectInfo | null {
    switch (action.type) {
        case 'NEW_OBJECT_INFO_DATA':
            return action.payload;
        default:
            return state;
    }
}