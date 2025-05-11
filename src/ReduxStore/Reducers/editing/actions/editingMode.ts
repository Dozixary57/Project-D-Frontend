import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EditingModeState {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  MODIFIED = 'MODIFIED',
}

interface IEditingFlags {
  title: boolean;
  category: boolean;
  description: boolean;
  acquisition: boolean;
  usedFor: boolean;
  lore: boolean;
  media: boolean;
  visualData: boolean;
  definition: boolean;
}

interface IEditingStateCombined {
  flags: IEditingFlags;
  editingState: EditingModeState;
}

const initialFlagsState: IEditingFlags = {
  title: false,
  category: false,
  description: false,
  acquisition: false,
  usedFor: false,
  lore: false,
  media: false,
  visualData: false,
  definition: false,
};

const initialState: IEditingStateCombined = {
  flags: initialFlagsState,
  editingState: EditingModeState.INACTIVE,
};

const editingModeFlagsSlice = createSlice({
  name: 'editingMode',
  initialState,
  reducers: {
    setEditingModeFlag: (
      state,
      action: PayloadAction<{ key: keyof IEditingFlags; value: boolean }>
    ) => {
      state.flags[action.payload.key] = action.payload.value;

      const hasChanges = Object.values(state.flags).some(flag => flag === true);
      state.editingState = hasChanges ? EditingModeState.MODIFIED : state.editingState;
    },
    resetEditingModeFlags: (state) => {
      state.flags = initialFlagsState;
      state.editingState = EditingModeState.INACTIVE;
    },
    setEditingState: (state, action: PayloadAction<EditingModeState>) => {
      state.editingState = action.payload;

      if (action.payload === EditingModeState.INACTIVE) {
        state.flags = initialFlagsState;
      }
    },
  },
});

export const {
  setEditingModeFlag,
  resetEditingModeFlags,
  setEditingState,
} = editingModeFlagsSlice.actions;

export default editingModeFlagsSlice.reducer;