import { IAction } from "../IAction";

const initialState = null;

export default function fileUploadErrors(state = initialState, action: IAction) {
  switch (action.type) {
    case 'FILE_UPLOAD_ERRORS':
      return action.payload;
    default:
      return state;
  }
}