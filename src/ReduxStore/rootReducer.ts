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
import fileUploadErrors from "./Reducers/fileUploadErrors";
import isEditingMode from "./Reducers/isEditingMode";
import editingState from "./Reducers/editingState";
import objectInfoPageEditingStates from "./Reducers/objectInfoPageEditingStates";
import objectInfoData from "./Reducers/objectInfoData";
import newObjectInfoData from "./Reducers/newObjectInfoData";
import objectsCountList from "./Reducers/objectsCountList";
import objectsFilteredResult from "./Reducers/objects/objectsFilteredResult";

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
    userPrivileges,
    fileUploadErrors,
    isEditingMode,
    editingState,
    objectInfoPageEditingStates,
    objectInfoData,
    newObjectInfoData,
    objectsCountList,
    objectsFilteredResult,
});