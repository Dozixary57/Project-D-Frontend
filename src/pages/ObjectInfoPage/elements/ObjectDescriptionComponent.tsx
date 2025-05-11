import { RootState } from "@ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./ObjectDescriptionComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import StyledMarkdown from '@components/StyledMarkdown';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect } from "react";
import { selectEditingFlags, selectEditingState } from "@ReduxStore/Reducers/editing/actions/editingModeSelectors";
import { setEditingModeFlag } from "@ReduxStore/Reducers/editing/actions/editingMode";
import { updateEditableFormObjectData } from "@ReduxStore/Reducers/editing/data/formObjectData";
import { hasTextMeaningfulChange } from "@tools/EditingDataComparer";

const ObjectDescriptionComponent = ({ description }: { description: string }) => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const dispatch = useDispatch();

  const editingModeState = useSelector(selectEditingState);
  const editingModeFlag = useSelector(selectEditingFlags);

  const formObjectData = useSelector((state: RootState) => state.formObjectData.editable);

  useEffect(() => {
    dispatch(setEditingModeFlag({
      key: 'description',
      value: hasTextMeaningfulChange(description, formObjectData?.Description)
    }));
  }, [formObjectData]);

  const discardChanges = () => {
    dispatch(updateEditableFormObjectData({ Description: description }));
    dispatch(setEditingModeFlag({ key: 'description', value: false }))
  }

  return (
    <div className="objectDescription">
      <div className="generalDataHeaderWrapper">
        <h2 className={`generalDataHeader ${description || editingModeState !== 'INACTIVE' ? 'withData' : 'withoutData'}`}>Description</h2>
        {isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE' ?
          <button
            title={editingModeFlag.description ? 'Undo changes' : 'No changes to undo'}
            className={`undoChangesButton ${editingModeFlag.description ? 'active' : 'inactive'}`}
            onClick={() => discardChanges()}
            disabled={!editingModeFlag.description}
          >
            <img src={require('@images/UndoIcon.png')} />
          </button>
          :
          !description && <p className="noTextData">isn't written yet...</p>
        }
      </div>
      <div className={`generalDataContent ${description && 'withData'}`}>
        {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE') ?
          <MDEditor
            value={formObjectData?.Description ?? ''}
            onChange={(value) => dispatch(updateEditableFormObjectData({ Description: value ?? '' }))}
            className="markdownEditor"
            commands={[
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.divider,
              // commands.link,
              commands.unorderedListCommand,
              commands.divider,
              commands.quote,
            ]}
            preview="edit"
          />
          :
          description && <StyledMarkdown>{description}</StyledMarkdown>
        }
      </div>
    </div>
  );
};

export default ObjectDescriptionComponent;