import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { store, RootState } from "@ReduxStore/store";
import "./ObjectNavigation.scss"
import { handleEditChanges } from '@tools/HandleEditChanges';
import { selectEditingState } from '@ReduxStore/Reducers/editing/actions/editingModeSelectors';
import { EditingModeState, setEditingState } from '@ReduxStore/Reducers/editing/actions/editingMode';

export const DataForNavigation = () => {
  const location = useLocation();

  const res = useSelector((state: RootState) => state.filteredItemsData);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        if (res) {
          const titles = res.map((item: any) => item.Title.replace(/ /g, "_"));
          store.dispatch({
            type: 'NAVIGATION_ITEMS_LIST',
            payload: titles
          })
          store.dispatch({
            type: 'ITEM_OBJECT_NAVIGATION_INDEX',
            payload: titles.indexOf(location.pathname.split('/')[3])
          })
        }
      } catch (error) {
        if (error) throw error
      }
    };

    void fetchTitles();
  }, [res, location]);

  return (
    <div style={{ display: "none" }}></div>
  )
};

export const PrevButton = () => {
  const navigate = useNavigate();
  const titles = useSelector((state: RootState) => state.navigationItemsList);
  const currentIndex = useSelector((state: RootState) => state.itemObjectsNavigationIndex);
  const editingModeState = useSelector(selectEditingState);
  const dispatch = useDispatch();

  const prevNavigation = () => {

    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = titles.length - 1;
    }

    store.dispatch({
      type: 'ITEM_OBJECT_NAVIGATION_INDEX',
      payload: newIndex
    })

    navigate(`/Content/Items/${titles[newIndex]}`);
  };

  if (titles.length >= 2) {
    return <button
      onClick={() => {
        if (editingModeState === 'INACTIVE') { prevNavigation() }
        else if (editingModeState === 'ACTIVE') { dispatch(setEditingState(EditingModeState.INACTIVE)); prevNavigation(); }
        else if (handleEditChanges(dispatch).exitEditingModeWithConfirmation()) setTimeout(() => prevNavigation(), 0);
      }}
      className="ObjectNavigationButtons ObjectNavigationLeftButton"
    > {"<"}</button >;
  } else {
    return (<div style={{ width: '2em' }}></div>)
  }
};

export const NextButton = () => {
  const navigate = useNavigate();
  const titles = useSelector((state: RootState) => state.navigationItemsList);
  const currentIndex = useSelector((state: RootState) => state.itemObjectsNavigationIndex);
  const editingModeState = useSelector(selectEditingState);
  const dispatch = useDispatch();

  const nextNavigation = () => {
    if (titles.length < 2) {
      return;
    }

    let newIndex = currentIndex + 1;
    if (newIndex >= titles.length) {
      newIndex = 0;
    }

    store.dispatch({
      type: 'ITEM_OBJECT_NAVIGATION_INDEX',
      payload: newIndex
    })

    navigate(`/Content/Items/${titles[newIndex]}`);
  };

  if (titles.length >= 2) {
    return <button
      onClick={() => {
        if (editingModeState === 'INACTIVE') { nextNavigation() }
        else if (editingModeState === 'ACTIVE') { dispatch(setEditingState(EditingModeState.INACTIVE)); nextNavigation(); }
        else if (handleEditChanges(dispatch).exitEditingModeWithConfirmation()) setTimeout(() => nextNavigation(), 0);
      }}
      className="ObjectNavigationButtons ObjectNavigationRightButton"
    >{">"}</button>;
  } else {
    return (<div style={{ width: '2em' }}></div>)
  }
};