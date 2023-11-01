import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {store, RootState} from "../../../ReduxStore/store";
import itemService from "../../../backend/services/itemService";
import "./ObjectNavigation.scss"

export const DataForNavigation = () => {
    const location = useLocation();

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const res = await itemService.getItems();
                const titles = res.map((item: any) => item.Title.replace(/ /g, "_"));
                store.dispatch({
                    type: 'NAVIGATION_ITEMS_LIST',
                    payload: titles
                })
                store.dispatch({
                    type: 'ITEM_OBJECT_NAVIGATION_INDEX',
                    payload: titles.indexOf(location.pathname.split('/')[3])
                })
            } catch (error) {
                if (error) throw error
            }
        };

        void fetchTitles();
    }, [location]);

    return(
        <div style={{display: "none"}}></div>
    )
};

export const PrevButton = () => {
    const navigate = useNavigate();
    const titles = useSelector((state: RootState) => state.navigationItemsList);
    const currentIndex = useSelector((state: RootState) => state.itemObjectsNavigationIndex);

    const prevNavigation = () => {
        if (titles.length < 2) {
            return;
        }

        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = titles.length - 1;
        }

        store.dispatch({
            type: 'ITEM_OBJECT_NAVIGATION_INDEX',
            payload: newIndex
        })

        navigate(`/Content/Item/${titles[newIndex]}`);
    };

    return <button onClick={prevNavigation} className="ObjectNavigationButtons ObjectNavigationLeftButton">{"<"}</button>;
};

export const NextButton = () => {
    const navigate = useNavigate();
    const titles = useSelector((state: RootState) => state.navigationItemsList);
    const currentIndex = useSelector((state: RootState) => state.itemObjectsNavigationIndex);

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

        navigate(`/Content/Item/${titles[newIndex]}`);
    };

    return <button onClick={nextNavigation} className="ObjectNavigationButtons ObjectNavigationRightButton">{">"}</button>;
};
