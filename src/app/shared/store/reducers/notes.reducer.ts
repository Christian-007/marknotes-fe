import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { NotesActions } from '../actions';
import { NavigationsActions } from '../actions';
import { INote } from '@app/shared/models/markdown-state.model';
import { sortDescendingByDateCreated } from '@app/shared/utils/sort.util';

export const notesFeatureKey = 'notes';
export interface NotesState extends EntityState<INote> {
  pending: boolean;
  error: string;
}

export const adapter: EntityAdapter<INote> = createEntityAdapter<INote>({
  sortComparer: sortDescendingByDateCreated,
});

const initialNotesState: NotesState = adapter.getInitialState({
  pending: false,
  error: null,
});

export const notesReducer = createReducer(
  initialNotesState,
  on(NotesActions.getNotes, state => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(NotesActions.getNotesSuccess, (state, { payload }) =>
    adapter.addAll(payload, { ...state, pending: false }),
  ),
  on(NotesActions.getNotesError, state => ({
    ...state,
    pending: false,
    error: 'Error',
  })),
  on(
    NavigationsActions.previewNote,
    NotesActions.updateNote,
    (state, { payload }) => adapter.updateOne(payload, state),
  ),
  on(NotesActions.addNoteSuccess, (state, { payload }) =>
    adapter.addOne(payload, state),
  ),
);

export const getPending = (state: NotesState) => state.pending;
