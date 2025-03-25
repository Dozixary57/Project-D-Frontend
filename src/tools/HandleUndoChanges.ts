import { Dispatch } from "redux";

export const handleUndoChanges = (dispatch: Dispatch) => {
  const userConfirmed = window.confirm("You have unsaved changes. Are you sure you want to undo changes?");
  if (userConfirmed) {
    dispatch({ type: "STOP_EDITING" });
    return true;
  }

  return false;
};