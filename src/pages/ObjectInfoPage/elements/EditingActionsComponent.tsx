import { RootState, store } from "../../../ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./EditingActionsComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import { useEffect, useState } from "react";
import { handleEditChanges } from "@tools/HandleEditChanges";
import ObjectsService from "@services/ObjectsService";

const EditingActionsComponent = () => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const editingState = useSelector((state: RootState) => state.editingState);
  const objectInfoPageEditingStates = useSelector((state: RootState) => state.objectInfoPageEditingStates);
  const [hasChanges, setHasChanges] = useState(Object.values(objectInfoPageEditingStates).some(value => value === true));
  const dispatch = useDispatch();

  const newObjectInfoData = useSelector((state: RootState) => state.newObjectInfoData);

  useEffect(() => {
    setHasChanges(Object.values(objectInfoPageEditingStates).some(value => value === true));
  }, [objectInfoPageEditingStates]);

  return (
    (isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE') &&
    <div className="editingActionsPanel">
      {/* <div className="actionsGroup">
        <button
          className="cancelBtn"
          onClick={() => handleUndoChanges(dispatch)}
        >
          <img src={require('@images/UndoIcon.png')} />
          <p>Cancel</p>
        </button>
      </div> */}
      <div className="actionsGroup">
        <button className="deleteBtn">
          <img src={require('@images/BinIcon.png')} />
          <p>Delete</p>
        </button>
      </div>
      <div className="actionsGroup">
        <button
          className="discardBtn"
          onClick={() => handleEditChanges(dispatch).discardAllChangesWithConfirmation()}
          disabled={!hasChanges}
        >
          <img src={require('@images/NoIcon.png')} />
          <p>Discard all changes</p>
        </button>
        <button
          className="saveBtn"
          onClick={() => ObjectsService.updateObjectData(newObjectInfoData)}
          disabled={!hasChanges}
        >
          <img src={require('@images/YesIcon.png')} />
          <p>Save</p>
        </button>
      </div>
    </div>
  );
};

export default EditingActionsComponent;