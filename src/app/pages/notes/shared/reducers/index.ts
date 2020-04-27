import {
  createFeatureSelector,
  createSelector,
  Action,
  combineReducers,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromNotes from 'src/app/pages/notes/shared/reducers/notes.reducer';

export interface ApplicationState {
  [fromNotes.notesFeatureKey]: fromNotes.NotesState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  [fromNotes.notesFeatureKey]: fromNotes.notesReducer,
};

const selectNotesState = createFeatureSelector<
  ApplicationState,
  fromNotes.NotesState
>(fromNotes.notesFeatureKey);

const selectNoteEntitiesState = createSelector(
  selectNotesState,
  state => state,
);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = fromNotes.adapter.getSelectors();

export const selectAllNotes = createSelector(
  selectNoteEntitiesState,
  selectAll,
);

export const selectNotesPending = createSelector(
  selectNoteEntitiesState,
  fromNotes.getPending,
);
