import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, store } from "../../../ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import style from "./PageHeaderComponent.module.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import { handleEditChanges } from '@tools/HandleEditChanges';

const PageHeaderComponent = ({ title, category = "" }: { title: string, category?: string }) => {
  const navigate = useNavigate();

  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  const editingState = useSelector((state: RootState) => state.editingState);
  const dispatch = useDispatch();

  const newObjectInfoData = useSelector((state: RootState) => state.newObjectInfoData);
  const objectInfoPageEditingStates = useSelector((state: RootState) => state.objectInfoPageEditingStates);

  const [favoriteToggle, setFavoriteToggle] = useState(false);

  useEffect(() => {
    if (newObjectInfoData !== null && newObjectInfoData?.Title !== title) {
      store.dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          title: true
        }
      })
    } else {
      store.dispatch({
        type: 'OBJECT_INFO_PAGE_EDITING_STATES',
        payload: {
          title: false
        }
      })
    }
  }, [newObjectInfoData]);

  const discardChanges = () => {
    dispatch({ type: 'NEW_OBJECT_INFO_DATA', payload: { ...newObjectInfoData, Title: title } })
    dispatch({ type: 'OBJECT_INFO_PAGE_EDITING_STATES', payload: { title: false } })
  }

  return (
    <div className={style.objectTitle}>
      <div className={style.backButton}>
        <button onClick={() => {
          if (editingState === 'MODIFIED') {
            if (handleEditChanges(dispatch).exitEditingModeWithConfirmation())
              return setTimeout(() => navigate('/Content/Items'), 0);
          }
          else navigate('/Content/Items');
        }
        }>&lt;</button>
      </div>

      <div className={style.titleData}>
        <div className={style.title}>
          {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingState !== 'INACTIVE') ?
            <div className={style.editableTitle}>
              <input
                type="text"
                value={newObjectInfoData?.Title || ""}
                onChange={(e) => dispatch({ type: 'NEW_OBJECT_INFO_DATA', payload: { ...newObjectInfoData, Title: e.target.value } })}
                defaultValue={title || ""}
              />
              <button
                onClick={() => discardChanges()}
                disabled={!objectInfoPageEditingStates.title}
              >
                <img
                  src={require('@images/UndoIcon.png')}
                  alt="SaveIcon"
                />
              </button>
            </div>
            :
            <h2>{title}</h2>
          }
        </div>
        <button
          title={!isAuthorized ? 'Sign in to add to favorites' : favoriteToggle ? 'Remove from favorites' : 'Add to favorites'}
          className={style.favoriteButton}
          onClick={() => setFavoriteToggle(prev => !prev)}
          disabled={!isAuthorized}
        >
          <img src={favoriteToggle ? require('@images/BookmarkOn.png') : require('@images/BookmarkOff.png')} alt="FavoriteIcon" />
        </button>
      </div>

      <div className={style.subtitleData}>
        <p>{category}</p>
      </div>

      {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit()) &&
        <div className={style.editButton}>
          <button
            title={editingState === 'ACTIVE' ? 'Editing mode is active' : editingState === 'MODIFIED' ? 'Has unsaved changes' : 'Editing mode is inactive'}
            className={`style.editingButton ${editingState === 'ACTIVE' ? style.active : editingState === 'MODIFIED' ? style.modified : style.inactive}`}
            onClick={() => {
              if (editingState === 'INACTIVE') dispatch({ type: 'START_EDITING' });
              else if (editingState === 'ACTIVE') dispatch({ type: 'STOP_EDITING' });
              else handleEditChanges(dispatch).exitEditingModeWithConfirmation();
            }}>
            <img src={require('@images/EditingIcon.png')} alt="EditingIcon" />
          </button>
        </div>
      }
    </div>
  );
};

export default PageHeaderComponent;