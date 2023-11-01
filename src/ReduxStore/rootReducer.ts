// rootReducer
import {combineReducers} from "@reduxjs/toolkit";
import itemObjectsNavigationIndex from "./Reducers/itemObjectsNavigation";
import navigationItemsList from "./Reducers/navigationItemsList"

export const rootReducer = combineReducers({
    itemObjectsNavigationIndex,
    navigationItemsList,
});