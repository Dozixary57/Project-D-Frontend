import { IObjectInfo } from "@interfaces/IObjectsData";

interface Action {
    type: string;
    payload: IObjectInfo | null;
}

const initialState: IObjectInfo | null = null;

export default function objectInfoData(state: IObjectInfo | null = initialState, action: Action): IObjectInfo | null {
    switch (action.type) {
        case 'OBJECT_INFO_DATA':
            return action.payload;
        default:
            return state;
    }
}