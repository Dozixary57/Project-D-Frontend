import { RootState, store } from "../../../ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./ObjectAcquisitionComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import StyledMarkdown from '@components/StyledMarkdown';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from "react";

const ObjectAcquisitionComponent = ({ acquisition }: { acquisition: any }) => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const editingState = useSelector((state: RootState) => state.editingState);
  const dispatch = useDispatch();

  const newObjectInfoData = useSelector((state: RootState) => state.newObjectInfoData);
  const objectInfoPageEditingStates = useSelector((state: RootState) => state.objectInfoPageEditingStates);

  useEffect(() => {
    if (newObjectInfoData !== null && newObjectInfoData?.Acquisition !== acquisition) {
      store.dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          acquisition: true
        }
      })
    } else {
      store.dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          acquisition: false
        }
      })
    }
  }, [newObjectInfoData]);

  const discardChanges = () => {
    dispatch({ type: 'NEW_OBJECT_INFO_DATA', payload: { ...newObjectInfoData, Acquisition: acquisition } })
    dispatch({ type: 'OBJECT_INFO_PAGE_EDITING_STATES', payload: { acquisition: false } })
  }

  return (
    <div className="objectAcquisition">
      <div className="generalDataHeaderWrapper">
        <h2 className={`generalDataHeader ${acquisition || editingState !== 'INACTIVE' ? 'withData' : 'withoutData'}`}>Acquisition</h2>
        {isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE' ?
          <button
            title={objectInfoPageEditingStates.acquisition ? 'Undo changes' : 'No changes to undo'}
            className={`undoChangesButton ${objectInfoPageEditingStates.acquisition ? 'active' : 'inactive'}`}
            onClick={() => discardChanges()}
            disabled={!objectInfoPageEditingStates.acquisition}
          >
            <img src={require('@images/UndoIcon.png')} />
          </button>
          :
          !acquisition && <p className="noTextData">isn't found yet...</p>
        }
      </div>
      <div className={`generalDataContent ${acquisition && 'withData'}`}>
        {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE') ?
          <MDEditor
            value={newObjectInfoData?.Acquisition ?? ''}
            onChange={(value) => {
              dispatch({
                type: 'NEW_OBJECT_INFO_DATA',
                payload: {
                  ...newObjectInfoData,
                  Acquisition: value
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
          acquisition && <StyledMarkdown>{acquisition}</StyledMarkdown>
        }
      </div>
    </div>
  );
};

export default ObjectAcquisitionComponent;