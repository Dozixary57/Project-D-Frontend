import { IObjectsCountList } from "@interfaces/IObjectsData";

interface Action {
  type: string;
  payload: Partial<IObjectsCountList>;
}

const initialState: Partial<IObjectsCountList> = {};

export default function objectsCountList(
  state = initialState,
  action: Action
): Partial<IObjectsCountList> {
  switch (action.type) {
    case 'OBJECTS_COUNT_LIST':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}