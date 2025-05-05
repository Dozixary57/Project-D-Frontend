interface Action {
  type: string;
  payload: any;
}

const initialState = null;

export default function objectsCountList(state = initialState, action: Action) {
  switch (action.type) {
    case 'OBJECTS_COUNT_LIST':
      return action.payload;
    default:
      return state;
  }
}