import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, store } from "../../../ReduxStore/store";
import { useSelector } from "react-redux";
import style from "./PageHeaderComponent.module.scss";

const PageHeaderComponent = ({ title, category = "" }: { title: string, category?: string }) => {
  const navigate = useNavigate();

  const userPrivileges = useSelector((state: RootState) => state.userPrivileges);
  const isEditingMode = useSelector((state: RootState) => state.isEditingMode);

  const setIsEditingModeToggle = () => {
    store.dispatch({ type: 'IS_EDITING_MODE', payload: !isEditingMode });
  };

  const [favoriteToggle, setFavoriteToggle] = useState(false);

  return (
    <div className={style.objectTitle}>
      <div className={style.backButton}>
        <button onClick={() => navigate('/Content/Items')}>&lt;</button>
      </div>

      <div className={style.titleData}>
        <h2>{title}</h2>
        <button onClick={() => setFavoriteToggle(prev => !prev)}>
          <img src={favoriteToggle ? require('@images/BookmarkOn.png') : require('@images/BookmarkOff.png')} alt="FavoriteIcon" />
        </button>
      </div>

      <div className={style.subtitleData}>
        <p>{category}</p>
      </div>

      <div className={style.editingActions}>
        {isEditingMode ?
          <>
            <button className={style.agreeButton}>
              <img src={require('@images/YesIcon.png')} alt="BinIcon"></img>
            </button>
            <button className={style.disagreeButton} onClick={() => setIsEditingModeToggle()}>
              <img src={require('@images/NoIcon.png')} alt="BinIcon"></img>
            </button>
          </>
          :
          <>
            {userPrivileges && userPrivileges.map(privilege => privilege.Title).includes('ObjectEdit') && (
              <button className={style.editingButton} onClick={() => setIsEditingModeToggle()}>
                <img src={require('@images/EditingIcon.png')} alt="EditingIcon" />
              </button>
            )}
            {userPrivileges && userPrivileges.map(privilege => privilege.Title).includes('ObjectDelete') && (
              <button className={style.disagreeButton}>
                <img src={require('@images/BinIcon.png')} alt="BinIcon"></img>
              </button>
            )}
          </>
        }
      </div>
      {/* <div className={style.actionIndicator}>
        <p style={isEditingMode ? { backgroundColor: 'rgba(226, 64, 0, 0.4)' } : { backgroundColor: 'rgba(170, 170, 170, 0.4)' }}>{isEditingMode ? "Editing" : "Viewing"}</p>
      </div> */}
    </div>
  );
};

export default PageHeaderComponent;