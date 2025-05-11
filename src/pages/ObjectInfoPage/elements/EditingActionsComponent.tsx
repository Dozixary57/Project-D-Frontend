import { RootState } from "@ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./EditingActionsComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import { handleEditChanges } from "@tools/HandleEditChanges";
import ObjectsService from "@services/ObjectsService";
import { selectEditingState } from "@ReduxStore/Reducers/editing/actions/editingModeSelectors";
import { EditingModeState, setEditingState } from "@ReduxStore/Reducers/editing/actions/editingMode";
import { resetEditableFormObjectData } from "@ReduxStore/Reducers/editing/data/formObjectData";

const EditingActionsComponent = () => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  const dispatch = useDispatch();

  const editingModeState = useSelector(selectEditingState);

  const formObjectData = useSelector((state: RootState) => state.formObjectData.editable);

  return (
    (isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE') &&
    <div className="editingActionsPanel">
      <div className="actionsGroup">
        <button
          className="cancelBtn"
          onClick={() => {
            if (editingModeState !== 'MODIFIED') {
              dispatch(setEditingState(EditingModeState.INACTIVE))
            } else {
              handleEditChanges(dispatch).exitEditingModeWithConfirmation()
            }
          }}
        >
          <img src={require('@images/UndoIcon.png')} />
          <p>Cancel</p>
        </button>
      </div>
      <div className="actionsGroup">
        <button className="deleteBtn">
          <img src={require('@images/BinIcon.png')} />
          <p>Delete</p>
        </button>
      </div>
      <div className="actionsGroup">
        <button
          className="discardBtn"
          onClick={() => {
            handleEditChanges(dispatch).discardAllChangesWithConfirmation();
            dispatch(resetEditableFormObjectData())
          }}
          disabled={editingModeState !== 'MODIFIED'}
        >
          <img src={require('@images/NoIcon.png')} />
          <p>Discard all changes</p>
        </button>
        <button
          className="saveBtn"
          onClick={() => ObjectsService.updateObjectData('Items', formObjectData)}
          disabled={editingModeState !== 'MODIFIED'}
        >
          <img src={require('@images/YesIcon.png')} />
          <p>Save</p>
        </button>
      </div>
    </div>
  );
};

export default EditingActionsComponent;