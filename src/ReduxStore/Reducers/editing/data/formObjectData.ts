import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IObjectInfo } from '@interfaces/IObjectsData';

interface IFormObjectDataState {
  original: IObjectInfo | null;
  editable: IObjectInfo | null;
}

const initialState: IFormObjectDataState = {
  original: null,
  editable: null,
};

const formObjectDataSlice = createSlice({
  name: 'formObjectData',
  initialState,
  reducers: {
    setFormObjectData: (state, action: PayloadAction<IObjectInfo | null>) => {
      state.original = action.payload;
      state.editable = JSON.parse(JSON.stringify(action.payload));
    },
    updateEditableFormObjectData: (state, action: PayloadAction<Partial<IObjectInfo>>) => {
      if (state.editable) {
        Object.assign(state.editable, action.payload);
      }
    },
    resetEditableFormObjectData: (state) => {
      if (state.original) {
        state.editable = JSON.parse(JSON.stringify(state.original));
      }
    },
  },
});

export const {
  setFormObjectData,
  updateEditableFormObjectData,
  resetEditableFormObjectData,
} = formObjectDataSlice.actions;

export default formObjectDataSlice.reducer;

// const formObjectData = useSelector((state: RootState) => state.formObjectData.editable);

// dispatch(setFormObjectData(myData));
// dispatch(updateEditableFormObjectData({ Title: 'New Title' }));
// dispatch(resetEditableFormObjectData());