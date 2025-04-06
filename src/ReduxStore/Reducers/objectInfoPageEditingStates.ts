import { IObjectInfoPageEditingStateFlags, ObjectInfoPageEditingStates } from "@tools/ObjectInfoPageEditingStates";

interface Action {
  type: string;
  payload: any;
}

const initialState: IObjectInfoPageEditingStateFlags = new ObjectInfoPageEditingStates();

export default function objectInfoPageEditingStates(
  state = initialState,
  action: Action
): IObjectInfoPageEditingStateFlags {
  switch (action.type) {
    case 'OBJECT_INFO_PAGE_EDITING_STATES':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}