// rootReducer
import {combineReducers} from "@reduxjs/toolkit";
import itemObjectsNavigationIndex from "./Reducers/itemObjectsNavigation";
import navigationItemsList from "./Reducers/navigationItemsList";
import itemsData from "./Reducers/itemsData"
import filteredItemsData from "./Reducers/filteredItemsData";
import filterTitle from "./Reducers/filterTitle";


export const rootReducer = combineReducers({
    itemObjectsNavigationIndex,
    navigationItemsList,
    itemsData,
    filteredItemsData,
    filterTitle,
});