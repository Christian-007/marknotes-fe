import { INote } from '@app/shared/models/markdown-state.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApplicationState } from '../reducers';
import * as fromNotes from '../reducers/notes.reducer';

export const selectFeatureState = createFeatureSelector<
  ApplicationState,
  fromNotes.NotesState
>(fromNotes.notesFeatureKey);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = fromNotes.adapter.getSelectors();

export const selectAllNotes = createSelector(selectFeatureState, selectAll);

export const selectNotesPending = createSelector(
  selectFeatureState,
  fromNotes.getPending,
);

export const selectOneLatestNote = createSelector(
  selectAllNotes,
  (notes: INote[]) => {
    const hasNotes = notes.length > 0;

    if (hasNotes) {
      return notes[0];
    }
  },
);
