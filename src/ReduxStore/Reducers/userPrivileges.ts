import { IPrivileges } from "../../Interfaces/IAccounts";

interface Action {
    type: string;
    payload: any;
}

type UserPrivilegesState = IPrivileges[] | null;

const initialState: UserPrivilegesState = null;

export default function userPrivileges(state = initialState, action: Action): UserPrivilegesState {
    switch (action.type) {
        case 'USER_PRIVILEGES':
            return action.payload;
        default:
            return state;
    }
}