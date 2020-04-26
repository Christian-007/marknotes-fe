import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromNotes from 'src/app/pages/notes/shared/reducers/notes.reducer';

export interface NotesState {
  [fromNotes.notesFeatureKey]: fromNotes.State;
}

const selectNotesState = createFeatureSelector<NotesState, fromNotes.State>(
  fromNotes.notesFeatureKey,
);

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
