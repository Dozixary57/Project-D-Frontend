import { RootState, store } from "../../../ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./ObjectStoryComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import StyledMarkdown from '@components/StyledMarkdown';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from "react";

const ObjectStoryComponent = ({ story }: { story: string }) => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const editingState = useSelector((state: RootState) => state.editingState);
  const dispatch = useDispatch();

  const newObjectInfoData = useSelector((state: RootState) => state.newObjectInfoData);
  const objectInfoPageEditingStates = useSelector((state: RootState) => state.objectInfoPageEditingStates);

  useEffect(() => {
    if (newObjectInfoData !== null && newObjectInfoData?.Lore !== story) {
      store.dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          story: true
        }
      })
    } else {
      store.dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          story: false
        }
      })
    }
  }, [newObjectInfoData]);

  const discardChanges = () => {
    dispatch({ type: 'NEW_OBJECT_INFO_DATA', payload: { ...newObjectInfoData, Lore: story } })
    dispatch({ type: 'OBJECT_INFO_PAGE_EDITING_STATES', payload: { story: false } })
  }

  return (
    <div className="objectStory">
      <div className="generalDataHeaderWrapper">
        <h2 className="generalDataHeader">Story</h2>
        {isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && (editingState === 'MODIFIED' || editingState === 'ACTIVE') &&
          <button
            title={objectInfoPageEditingStates.story ? 'Undo changes' : 'No changes to undo'}
            className={`undoChangesButton ${objectInfoPageEditingStates.story ? 'active' : 'inactive'}`}
            onClick={() => discardChanges()}
            disabled={!objectInfoPageEditingStates.story}
          >
            <img src={require('@images/UndoIcon.png')} />
          </button>}
      </div>
      <div className="generalDataContent">
        <div>
          {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE') ?
            <MDEditor
              value={newObjectInfoData?.Lore ?? ''}
              onChange={(value) => {
                dispatch({
                  type: 'NEW_OBJECT_INFO_DATA',
                  payload: {
                    ...newObjectInfoData,
                    Lore: value
                  }
                });
              }}
              className="markdownEditor"
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.divider,
                commands.quote,
              ]}
              preview="edit"
            />
            :
            story ?
              <StyledMarkdown>{story ?? ''}</StyledMarkdown>
              :
              <p className="noData">Story isn't written...</p>
          }
        </div>

      </div>
    </div >
  );
};

export default ObjectStoryComponent;