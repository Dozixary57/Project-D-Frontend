import { RootState, store } from "../../../ReduxStore/store";
import { useSelector } from "react-redux";
import style from "./EditingActionsComponent.module.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';

const EditingActionsComponent = () => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const isEditingMode = useSelector((state: RootState) => state.isEditingMode); 

  return (
    (isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && isEditingMode) &&
    <div className={style.editingActionsPanel}>
      <button onClick={() => store.dispatch({ type: 'IS_EDITING_MODE', payload: false })}>
        Cancel
      </button>
      <button>
        Save
      </button>
    </div>
  );
};

export default EditingActionsComponent;