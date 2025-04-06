import { Dispatch } from "redux";

export const handleEditChanges = (dispatch: Dispatch) => {
  return {
    exitEditingModeWithConfirmation: () => {
      const userConfirmed = window.confirm("You have unsaved changes. Are you sure you want to undo changes?");
      if (userConfirmed) {
        dispatch({ type: "STOP_EDITING" });
        dispatch({
          type: 'OBJECT_INFO_PAGE_EDITING_STATES',
          payload: {
            title: false,
            category: false,
            description: false,
            acquisition: false,
            usedFor: false,
            story: false,
            media: false,
            visualData: false,
            definition: false
          }
        });
        return true;
      }

      return false;
    },
    discardAllChangesWithConfirmation: () => {
      const userConfirmed = window.confirm("You have unsaved changes. Are you sure you want to discard changes?");
      if (userConfirmed) {
        dispatch({
          type: 'OBJECT_INFO_PAGE_EDITING_STATES',
          payload: {
            title: false,
            category: false,
            description: false,
            acquisition: false,
            usedFor: false,
            story: false,
            media: false,
            visualData: false,
            definition: false
          }
        });
        return true;
      }

      return false;
    },
    resetAllStatesByDefault: () => {
      dispatch({ type: "STOP_EDITING" });
      dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          title: false,
          category: false,
          description: false,
          acquisition: false,
          usedFor: false,
          story: false,
          media: false,
          visualData: false,
          definition: false
        }
      });
    },
  }
};