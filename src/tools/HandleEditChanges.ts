import { EditingModeState, setEditingState } from "@ReduxStore/Reducers/editing/actions/editingMode";
import { Dispatch } from "redux";

export const handleEditChanges = (dispatch: Dispatch) => {
  return {
    exitEditingModeWithConfirmation: () => {
      const userConfirmed = window.confirm("You have unsaved changes. Are you sure you want to undo changes?");
      if (userConfirmed) {
        dispatch(setEditingState(EditingModeState.INACTIVE));
        return true;
      }

      return false;
    },
    discardAllChangesWithConfirmation: () => {
      const userConfirmed = window.confirm("You have unsaved changes. Are you sure you want to discard changes?");
      if (userConfirmed) {
        dispatch(setEditingState(EditingModeState.ACTIVE));
        return true;
      }

      return false;
    }
  }
};