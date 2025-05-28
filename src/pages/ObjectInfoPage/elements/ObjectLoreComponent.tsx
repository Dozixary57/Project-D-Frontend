import { RootState, store } from "@ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./ObjectLoreComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import StyledMarkdown from '@components/StyledMarkdown';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from "react";
import { setEditingModeFlag } from "@ReduxStore/Reducers/editing/actions/editingMode";
import { updateEditableFormObjectData } from "@ReduxStore/Reducers/editing/data/formObjectData";
import { selectEditingFlags, selectEditingState } from "@ReduxStore/Reducers/editing/actions/editingModeSelectors";
import { hasTextMeaningfulChange } from "@tools/EditingDataComparer";
import { useTranslation } from 'react-i18next';

const ObjectStoryComponent = ({ lore }: { lore: string }) => {
  const { t } = useTranslation();

  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const dispatch = useDispatch();

  const editingModeState = useSelector(selectEditingState);
  const editingModeFlag = useSelector(selectEditingFlags);

  const formObjectData = useSelector((state: RootState) => state.formObjectData.editable);

  useEffect(() => {
    dispatch(setEditingModeFlag({
      key: 'lore',
      value: hasTextMeaningfulChange(lore, formObjectData?.Lore)
    }));
  }, [formObjectData]);

  const discardChanges = () => {
    dispatch(updateEditableFormObjectData({ Lore: lore }));
    dispatch(setEditingModeFlag({ key: 'lore', value: false }))
  }

  return (
    <div className="objectStory">
      <div className="generalDataHeaderWrapper">
        <h2 className={`generalDataHeader ${lore || editingModeState !== 'INACTIVE' ? 'withData' : 'withoutData'}`}>{t('objectInfo.sections.lore')}</h2>
        {isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE' ?
          <button
            title={editingModeFlag.lore ? 'Undo changes' : 'No changes to undo'}
            className={`undoChangesButton ${editingModeFlag.lore ? 'active' : 'inactive'}`}
            onClick={() => discardChanges()}
            disabled={!editingModeFlag.lore}
          >
            <img src={require('@images/UndoIcon.png')} />
          </button>
          :
          !lore && <p className="noTextData">isn't unknown yet...</p>
        }
      </div>
      <div className={`generalDataContent ${lore ? 'withData' : ''}`}>
        {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE') ?
          <MDEditor
            value={formObjectData?.Lore ?? ''}
            onChange={(value) => dispatch(updateEditableFormObjectData({ Lore: value ?? '' }))}
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
          lore && <StyledMarkdown>{lore}</StyledMarkdown>
        }
      </div>
    </div>
  );
};

export default ObjectStoryComponent;