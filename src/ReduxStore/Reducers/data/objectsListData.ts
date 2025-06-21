import { IIdeaInfo } from "@interfaces/ideas/IIdeaInfo";

interface Action {
  type: string;
  payload: any;
}

const initialState: any = null;

export default function objectsListData(
  state: any = initialState,
  action: Action
): any {
  switch (action.type) {
    case 'OBJECTS_LIST_DATA':
      return action.payload;
    default:
      return state;
  }
}
