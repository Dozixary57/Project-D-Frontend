import { IIdeaInfo } from "@interfaces/ideas/IIdeaInfo";

interface Action {
  type: string;
  payload: IIdeaInfo[] | null;
}

const initialState: IIdeaInfo[] | null = null;

export default function objectsListData(
  state: IIdeaInfo[] | null = initialState,
  action: Action
): IIdeaInfo[] | null {
  switch (action.type) {
    case 'OBJECTS_LIST_DATA':
      return action.payload;
    default:
      return state;
  }
}
