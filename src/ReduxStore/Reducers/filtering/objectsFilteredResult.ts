import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterParams {
  [key: string]: string | number | boolean | Array<string | number | boolean> | null;
}

interface ObjectEntry {
  _id: string;
  Title: string;
  [key: string]: any;
}

interface ObjectsState {
  objectsData: Record<string, any[]>;
  filterTitleQuery: string | null;
  filterParamsList: FilterParams | null;
  filterByCategory: string[] | null;
}

const initialState: ObjectsState = {
  objectsData: {},
  filterTitleQuery: null,
  filterParamsList: null,
  filterByCategory: null
};

const objectsSlice = createSlice({
  name: 'objectsFilteredResult',
  initialState,
  reducers: {
    setObjectsData(state, action: PayloadAction<Record<string, ObjectEntry[]>>) {
      for (const [category, newItems] of Object.entries(action.payload)) {
        const currentItems = state.objectsData[category] || [];
        const updatedItems = [...currentItems];

        newItems.forEach(newItem => {
          const existingIndex = updatedItems.findIndex(item => item._id === newItem._id);
          if (existingIndex !== -1) {
            updatedItems[existingIndex] = newItem;
          } else {
            updatedItems.push(newItem);
          }
        });

        state.objectsData[category] = updatedItems;
      }
    },
    setFilterTitleQuery(state, action: PayloadAction<string | null>) {
      state.filterTitleQuery = action.payload;
    },
    setFilterParamsList(state, action: PayloadAction<FilterParams | null>) {
      state.filterParamsList = action.payload;
    },
    setFilterByCategory(state, action: PayloadAction<string[] | null>) {
      state.filterByCategory = action.payload;
    }
  }
});

export const {
  setObjectsData,
  setFilterTitleQuery,
  setFilterParamsList,
  setFilterByCategory,
} = objectsSlice.actions;

export default objectsSlice.reducer;

// Example usage

// const filteredObjects = useSelector(selectFilteredObjects);

// dispatch(setObjectsData({
//   Items: [
//     { _id: '1', Title: 'Axe', Description: 'Sharp blade' },
//     { _id: '2', Title: 'Sword', Description: 'Steel sword' }
//   ]
// }));

// dispatch(setObjectsData({
//   Creatures: [
//     { _id: '1', Title: 'Dragon', Description: 'Fire-breathing beast' }
//   ]
// }));

// dispatch(setObjectsData({
//   Items: [
//     { _id: '2', Title: 'Long Sword', Description: 'Longer steel blade' },
//     { _id: '3', Title: 'Bow', Description: 'Ranged weapon' }
//   ]
// }));

// Filter by title (search for "sword")
// dispatch(setFilterTitleQuery("sword"));

//Filter by category
// dispatch(setFilterByCategory(["Items"]));



// import { selectIsFiltered } from "@ReduxStore/selectors/objectsFilteredResult";

// const isFiltered = useSelector(selectIsFiltered);



// const filterParams: { ID?: number; Title?: string } = {};

// if (searchQuery.queryId) {
//   filterParams.ID = Number(searchQuery.queryId);
// }

// if (searchQuery.queryTitle) {
//   filterParams.Title = searchQuery.queryTitle;
// }

// dispatch(setFilterParamsList(filterParams));