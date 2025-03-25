import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../../ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import style from "./PageHeaderComponent.module.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import { handleUndoChanges } from '@tools/HandleUndoChanges';

const PageHeaderComponent = ({ title, category = "" }: { title: string, category?: string }) => {
  const navigate = useNavigate();

  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  const editingState = useSelector((state: RootState) => state.editingState);
  const dispatch = useDispatch();

  const [favoriteToggle, setFavoriteToggle] = useState(false);

  return (
    <div className={style.objectTitle}>
      <div className={style.backButton}>
        <button onClick={() => {
          if (editingState === 'MODIFIED') {
            if (handleUndoChanges(dispatch)) return navigate('/Content/Items')
          }
          else navigate('/Content/Items');
        }
          }>&lt;</button>
      </div>

      <div className={style.titleData}>
        <h2>{title}</h2>
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
              else handleUndoChanges(dispatch);
            }}>
            <img src={require('@images/EditingIcon.png')} alt="EditingIcon" />
          </button>
        </div>
      }
    </div>
  );
};

export default PageHeaderComponent;