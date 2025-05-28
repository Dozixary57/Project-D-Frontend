import { RootState } from "@ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./ObjectAcquisitionComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import StyledMarkdown from '@components/StyledMarkdown';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect } from "react";
import { selectEditingFlags, selectEditingState } from "@ReduxStore/Reducers/editing/actions/editingModeSelectors";
import { setEditingModeFlag } from "@ReduxStore/Reducers/editing/actions/editingMode";
import { updateEditableFormObjectData } from "@ReduxStore/Reducers/editing/data/formObjectData";
import { hasTextMeaningfulChange } from "@tools/EditingDataComparer";
import { useTranslation } from 'react-i18next';

const ObjectAcquisitionComponent = ({ acquisition }: { acquisition: any }) => {
  const { t } = useTranslation();

  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const dispatch = useDispatch();

  const editingModeState = useSelector(selectEditingState);
  const editingModeFlag = useSelector(selectEditingFlags);

  const formObjectData = useSelector((state: RootState) => state.formObjectData.editable);

  useEffect(() => {
    dispatch(setEditingModeFlag({
      key: 'acquisition',
      value: hasTextMeaningfulChange(acquisition, formObjectData?.Acquisition)
    }))
  }, [formObjectData]);

  const discardChanges = () => {
    dispatch(updateEditableFormObjectData({ Acquisition: acquisition }));
    dispatch(setEditingModeFlag({ key: 'acquisition', value: false }))
  }

  return (
    <div className="objectAcquisition">
      <div className="generalDataHeaderWrapper">
        <h2 className={`generalDataHeader ${acquisition || editingModeState !== 'INACTIVE' ? 'withData' : 'withoutData'}`}>{t('objectInfo.sections.acquisition')}</h2>
        {isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE' ?
          <button
            title={editingModeFlag.acquisition ? 'Undo changes' : 'No changes to undo'}
            className={`undoChangesButton ${editingModeFlag.acquisition ? 'active' : 'inactive'}`}
            onClick={() => discardChanges()}
            disabled={!editingModeFlag.acquisition}
          >
            <img src={require('@images/UndoIcon.png')} />
          </button>
          :
          !acquisition && <p className="noTextData">isn't found yet...</p>
        }
      </div>
      <div className={`generalDataContent ${acquisition && 'withData'}`}>
        {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE') ?
          <MDEditor
            value={formObjectData?.Acquisition ?? ''}
            onChange={(value) => dispatch(updateEditableFormObjectData({ Acquisition: value ?? '' }))}
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