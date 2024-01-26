// rootReducer
import {combineReducers} from "@reduxjs/toolkit";
import itemObjectsNavigationIndex from "./Reducers/itemObjectsNavigation";
import navigationItemsList from "./Reducers/navigationItemsList";
import itemsData from "./Reducers/itemsData"
import filteredItemsData from "./Reducers/filteredItemsData";
import searchTitleId from "./Reducers/searchTitleId";
import newsTypesData from "./Reducers/newsTypesData";
import newsData from "./Reducers/newsData";


export const rootReducer = combineReducers({
    itemObjectsNavigationIndex,
    navigationItemsList,
    itemsData,
    filteredItemsData,
    searchTitleId,
    newsTypesData,
    newsData,
});