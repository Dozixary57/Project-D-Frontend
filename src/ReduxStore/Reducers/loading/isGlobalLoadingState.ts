interface Action {
  type: string;
  payload: any;
}

const initialState = false;

export default function isGlobalLoadingState(state = initialState, action: Action) {
  switch (action.type) {
    case 'IS_GLOBAL_LOADING_STATE':
      return action.payload;
    default:
      return state;
  }
}