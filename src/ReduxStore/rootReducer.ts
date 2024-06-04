// rootReducer
import {combineReducers} from "@reduxjs/toolkit";
import itemObjectsNavigationIndex from "./Reducers/itemObjectsNavigation";
import navigationItemsList from "./Reducers/navigationItemsList";
import itemsData from "./Reducers/itemsData"
import filteredItemsData from "./Reducers/filteredItemsData";
import searchTitleId from "./Reducers/searchTitleId";
import newsTypesData from "./Reducers/newsTypesData";
import allNewsData from "./Reducers/allNewsData";
import oneNewsData from "./Reducers/oneNewsData";
import isLoadingState from "./Reducers/isLoadingState";
import isAuthorized from "./Reducers/isAuthorized";
import userPrivileges from "./Reducers/userPrivileges";

export const rootReducer = combineReducers({
    itemObjectsNavigationIndex,
    navigationItemsList,
    itemsData,
    filteredItemsData,
    searchTitleId,
    newsTypesData,
    allNewsData,
    oneNewsData,
    isLoadingState,
    isAuthorized,
    userPrivileges
});