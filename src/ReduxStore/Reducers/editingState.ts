enum EditingState {
    INACTIVE = 'INACTIVE',  // Editing disabled
    ACTIVE = 'ACTIVE',      // Editing enabled, without changes 
    MODIFIED = 'MODIFIED'   // Editing enabled, with changes
}

const START_EDITING = 'START_EDITING';
const CONTENT_MODIFIED = 'CONTENT_MODIFIED';
const STOP_EDITING = 'STOP_EDITING';

export const startEditing = () => ({ type: START_EDITING } as const);
export const contentModified = () => ({ type: CONTENT_MODIFIED } as const);
export const stopEditing = () => ({ type: STOP_EDITING } as const);

type EditingActions = ReturnType<typeof startEditing | typeof contentModified | typeof stopEditing>;

const initialState: EditingState = EditingState.INACTIVE;

export default function editingState(state = initialState, action: EditingActions): EditingState {
    switch (action.type) {
        case START_EDITING:
            return EditingState.ACTIVE;
        case CONTENT_MODIFIED:
            return EditingState.MODIFIED;
        case STOP_EDITING:
            return EditingState.INACTIVE;
        default:
            return state;
    }
}