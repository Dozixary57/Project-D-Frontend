import { RootState, store } from "../../../ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./ObjectDescriptionComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import StyledMarkdown from '@components/StyledMarkdown';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from "react";

const ObjectDescriptionComponent = ({ description }: { description: string }) => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const editingState = useSelector((state: RootState) => state.editingState);
  const dispatch = useDispatch();

  const newObjectInfoData = useSelector((state: RootState) => state.newObjectInfoData);
  const objectInfoPageEditingStates = useSelector((state: RootState) => state.objectInfoPageEditingStates);

  useEffect(() => {
    if (newObjectInfoData !== null && newObjectInfoData?.Description !== description) {
      store.dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          description: true
        }
      })
    } else {
      store.dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          description: false
        }
      })
    }
  }, [newObjectInfoData]);

  useEffect(() => {
    console.log(editingState)
  }, [editingState]);

  const discardChanges = () => {
    dispatch({ type: 'NEW_OBJECT_INFO_DATA', payload: { ...newObjectInfoData, Description: description } })
    dispatch({ type: 'OBJECT_INFO_PAGE_EDITING_STATES', payload: { description: false } })
  }

  return (
    <div className="objectDescription">
      <div className="generalDataHeaderWrapper">
        <h2 className={`generalDataHeader ${description || editingState !== 'INACTIVE' ? 'withData' : 'withoutData'}`}>Description</h2>
        {isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE' ?
          <button
            title={objectInfoPageEditingStates.description ? 'Undo changes' : 'No changes to undo'}
            className={`undoChangesButton ${objectInfoPageEditingStates.description ? 'active' : 'inactive'}`}
            onClick={() => discardChanges()}
            disabled={!objectInfoPageEditingStates.description}
          >
            <img src={require('@images/UndoIcon.png')} />
          </button>
          :
          !description && <p className="noTextData">isn't written yet...</p>
        }
      </div>
      <div className={`generalDataContent ${description && 'withData'}`}>
        {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE') ?
          <MDEditor
            value={newObjectInfoData?.Description ?? ''}
            onChange={(value) => {
              dispatch({
                type: 'NEW_OBJECT_INFO_DATA',
                payload: {
                  ...newObjectInfoData,
                  Description: value
                }
              })
            }}
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