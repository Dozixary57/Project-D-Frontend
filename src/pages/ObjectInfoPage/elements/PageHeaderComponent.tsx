import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from "@ReduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import style from "./PageHeaderComponent.module.scss";
import { GetCurrentUserPrivileges } from '@tools/GetUserData';
import { handleEditChanges } from '@tools/HandleEditChanges';
import { EditingModeState, setEditingModeFlag, setEditingState } from '@ReduxStore/Reducers/editing/actions/editingMode';
import { selectEditingFlags, selectEditingState } from '@ReduxStore/Reducers/editing/actions/editingModeSelectors';
import { updateEditableFormObjectData } from '@ReduxStore/Reducers/editing/data/formObjectData';
import { hasTextMeaningfulChange } from '@tools/EditingDataComparer';
import StyledSelector from '@components/StyledSelector/StyledSelector';
import ObjectsService from '@services/ObjectsService';
import { useTranslation } from 'react-i18next';

const PageHeaderComponent = ({ title, category }: { title: string, category?: string }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  const dispatch = useDispatch();

  const formObjectData = useSelector((state: RootState) => state.formObjectData.editable);

  const editingModeState = useSelector(selectEditingState);
  const editingModeFlag = useSelector(selectEditingFlags);

  const [favoriteToggle, setFavoriteToggle] = useState(false);

  const [objectCategories, setObjectCategories] = useState<{ value: string; label: string }[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{ value: string; label: string } | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await ObjectsService.getObjectsSelectCategories();
      setObjectCategories(data);
    };

    if (editingModeState === 'ACTIVE') {
      fetchCategories();
    }
  }, [editingModeState]);

  useEffect(() => {
    if (objectCategories && formObjectData) {
      const category = formObjectData.Category;
      if (category) {
        const match = objectCategories.find(opt =>
          opt.value.toLowerCase() === category.toLowerCase()
        );
        if (match) {
          setSelectedCategory(match);
        }
      }
    }
  }, [objectCategories, formObjectData?.Category]);

  useEffect(() => {
    dispatch(setEditingModeFlag({
      key: 'title',
      value: hasTextMeaningfulChange(title, formObjectData?.Title)
    }))
    dispatch(setEditingModeFlag({
      key: 'category',
      value: hasTextMeaningfulChange(category, formObjectData?.Category)
    }))
  }, [formObjectData]);

  const discardTitleChanges = () => {
    dispatch(updateEditableFormObjectData({ Title: title }));
    dispatch(setEditingModeFlag({ key: 'title', value: false }))
  }

  const discardCategoryChanges = () => {
    dispatch(updateEditableFormObjectData({ Category: category }));
    dispatch(setEditingModeFlag({ key: 'category', value: false }))
  }

  return (
    <div className={style.objectTitle}>
      <div className={style.backButton}>
        <button onClick={() => {
          if (editingModeState === 'MODIFIED') {
            if (handleEditChanges(dispatch).exitEditingModeWithConfirmation())
              return setTimeout(() => navigate('/Content/Items'), 0);
          }
          else navigate('/Content/Items');
        }
        }>&lt;</button>
      </div>

      <div className={style.titleData}>
        <div className={style.title}>
          {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE') ?
            <div className={style.editableTitle}>
              <input
                type="text"
                value={formObjectData?.Title || ""}
                onChange={(e) => dispatch(updateEditableFormObjectData({ Title: e.target.value }))}
                defaultValue={title || ""}
              />
              <button
                className={style.undoButton}
                onClick={() => discardTitleChanges()}
                disabled={!editingModeFlag.title}
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
        {editingModeState === 'INACTIVE' &&
          <button
            title={!isAuthorized ? 'Sign in to add to favorites' : favoriteToggle ? 'Remove from favorites' : 'Add to favorites'}
            className={style.favoriteButton}
            onClick={() => setFavoriteToggle(prev => !prev)}
            disabled={!isAuthorized}
          >
            <img src={favoriteToggle ? require('@images/BookmarkOn.png') : require('@images/BookmarkOff.png')} alt="FavoriteIcon" />
          </button>
        }
      </div>

      <div className={style.subtitleData}>
        {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit() && editingModeState !== 'INACTIVE') ?
          <>
            <StyledSelector
              options={objectCategories ? objectCategories : category ? [{ value: category.toLowerCase(), label: category }] : []}
              value={selectedCategory?.value || category?.toLowerCase() || ''}
              onChange={(value) => {
                const match = objectCategories?.find(opt => opt.value === value) || null;
                setSelectedCategory(match);
                dispatch(updateEditableFormObjectData({ Category: value.charAt(0).toUpperCase() + value.slice(1) }));
              }}
              className={style.categorySelector}
              placeholder="Select category"
            />
            <button
              className={style.undoButton}
              onClick={() => discardCategoryChanges()}
              disabled={!editingModeFlag.category}
            >
              <img
                src={require('@images/UndoIcon.png')}
                alt="UndoIcon"
              />
            </button>
          </>
          :
          // <p>{category ? (category.endsWith('s') ? category.slice(0, -1) : category) : ''}</p>
          <p>{category ? t(`objectInfo.category.${category.toLowerCase()}`) : ''}</p>
        }
      </div>

      {(isAuthorized && GetCurrentUserPrivileges.isObjectEdit()) &&
        <div className={style.editButton}>
          <button
            title={editingModeState === 'ACTIVE' ? 'Editing mode is active' : editingModeState === 'MODIFIED' ? 'Has unsaved changes' : 'Editing mode is inactive'}
            className={`style.editingButton ${editingModeState === 'ACTIVE' ? style.active : editingModeState === 'MODIFIED' ? style.modified : style.inactive}`}
            onClick={() => {
              if (editingModeState === 'INACTIVE') dispatch(setEditingState(EditingModeState.ACTIVE));
              else if (editingModeState !== 'MODIFIED') dispatch(setEditingState(EditingModeState.INACTIVE));
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