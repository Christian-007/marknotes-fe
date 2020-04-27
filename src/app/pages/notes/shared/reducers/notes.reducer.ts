import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { NotesActions } from '../actions';
import { INote } from 'src/app/shared/services/store/markdown-state.model';

export const notesFeatureKey = 'notes';
export interface NotesState extends EntityState<INote> {
  pending: boolean;
  error: string;
}

export const adapter: EntityAdapter<INote> = createEntityAdapter<INote>();

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
);

export const getPending = (state: NotesState) => state.pending;
