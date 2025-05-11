import { createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '@ReduxStore/store';
import { EditingModeState } from './editingMode';
import { resetEditableFormObjectData } from '../data/formObjectData';

export const selectEditingFlags = (state: RootState) => state.editingMode.flags;
export const selectEditingStateRaw = (state: RootState) => state.editingMode.editingState;

export const selectEditingState = createSelector(
  [selectEditingFlags, selectEditingStateRaw],
  (flags, currentState): EditingModeState => {
    const hasChanges = Object.values(flags).some(flag => flag === true);

    if (hasChanges) return EditingModeState.MODIFIED;

    if (currentState === EditingModeState.MODIFIED) {
      // store.dispatch(resetEditableFormObjectData());
      return EditingModeState.ACTIVE;
    }

    store.dispatch(resetEditableFormObjectData());

    return currentState;
  }
);