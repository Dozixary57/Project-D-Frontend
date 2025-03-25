import { RootState } from "../../../ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import "./ObjectDescriptionComponent.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import StyledMarkdown from '@components/StyledMarkdown';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from "react";

const ObjectDescriptionComponent = ({ description }: { description: { General: string, Authorial: string } }) => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);
  const editingState = useSelector((state: RootState) => state.editingState);
  const dispatch = useDispatch();

  const [currentDescription, setCurrentDescription] = useState(description);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  
  useEffect(() => {
    if (editingState === 'INACTIVE' && descriptionChanged) {
      setCurrentDescription(description);
      return;
    }
    
    if (JSON.stringify(description) !== JSON.stringify(currentDescription)) {
      setDescriptionChanged(true);
    } else {
      setDescriptionChanged(false);
    }

    if (editingState === 'ACTIVE' && descriptionChanged) {
      dispatch({ type: 'CONTENT_MODIFIED' });
    } else if (editingState === 'MODIFIED' && !descriptionChanged) {
      dispatch({ type: 'START_EDITING' });
    }
  }, [currentDescription, descriptionChanged]);

  return (
    <div className="objectDescription">
      <h2 className="generalDataHeader">Description</h2>
      <div className="generalDataContent">
        <div>
          {/* {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && isEditingMode) ? */}
          {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE') ?
            <MDEditor
              value={currentDescription.General ?? ''}
              onChange={(value) => { setCurrentDescription({ ...currentDescription, General: value || '' }) }}
              className="markdownEditor"
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.divider,
                // commands.link,
                commands.unorderedListCommand,
              ]}
            />
            :
            <StyledMarkdown>{description.General ?? ''}</StyledMarkdown>
          }
        </div>
        <div>
          {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE') ?
            <MDEditor
              value={currentDescription.Authorial ?? ''}
              onChange={(value) => { setCurrentDescription({ ...currentDescription, Authorial: value || '' }) }}
              className="markdownEditor"
              commands={[
                commands.quote,
                commands.divider,
                commands.bold,
                commands.italic,
                commands.strikethrough,
              ]}
            />
            :
            <StyledMarkdown>{description.Authorial ?? ''}</StyledMarkdown>
          }
        </div>
      </div>
    </div>
  );
};

export default ObjectDescriptionComponent;