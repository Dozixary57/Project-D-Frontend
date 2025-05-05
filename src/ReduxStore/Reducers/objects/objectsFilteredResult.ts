import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterParams {
  [key: string]: string | number | boolean | Array<string | number | boolean> | null;
}

interface ObjectsState {
  objectsData: any[];
  filterTitleQuery: string | null;
  filterParamsList: FilterParams | null;
  isFilterByCategory: boolean;
}

const initialState: ObjectsState = {
  objectsData: [],
  filterTitleQuery: null,
  filterParamsList: null,
  isFilterByCategory: false
};

const objectsSlice = createSlice({
  name: 'objectsFilteredResult',
  initialState,
  reducers: {
    setObjectsData(state, action: PayloadAction<any[]>) {
      state.objectsData = action.payload;
    },
    setFilterTitleQuery(state, action: PayloadAction<string | null>) {
      state.filterTitleQuery = action.payload;
    },
    setFilterParamsList(state, action: PayloadAction<FilterParams | null>) {
      state.filterParamsList = action.payload;
    },
    setIsFilterByCategory(state, action: PayloadAction<boolean>) {
      state.isFilterByCategory = action.payload;
    }
  }
});

export const {
  setObjectsData,
  setFilterTitleQuery,
  setFilterParamsList,
  setIsFilterByCategory,
} = objectsSlice.actions;

export default objectsSlice.reducer;