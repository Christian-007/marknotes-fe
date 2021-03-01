import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { NotesActions } from '../actions';
import { NavigationsActions } from '../actions';

import { INote } from '@app/shared/models/markdown-state.model';
import { sortDescendingByDateCreated } from '@app/shared/utils/entity-adapter.util';

export const notesFeatureKey = 'notes';
export interface NotesState extends EntityState<INote> {
  activeNote: INote;
  pending: boolean;
  error: string;
}

export const adapter: EntityAdapter<INote> = createEntityAdapter<INote>({
  sortComparer: sortDescendingByDateCreated,
});

const initialNotesState: NotesState = adapter.getInitialState({
  activeNote: null,
  pending: false,
  error: null,
});

export const notesReducer = createReducer(
  initialNotesState,
  on(NotesActions.fetchAllNotes, NotesActions.addOneNote, state => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(NotesActions.fetchAllNotesSuccess, (state, { payload }) =>
    adapter.setAll(payload, { ...state, pending: false }),
  ),
  on(NotesActions.fetchAllNotesError, state => ({
    ...state,
    pending: false,
    error: 'Error',
  })),
  on(NotesActions.fetchOneNote, state => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(NotesActions.fetchOneNoteSuccess, (state, { payload }) => ({
    ...state,
    activeNote: payload,
    pending: false,
  })),
  on(
    NavigationsActions.previewNote,
    NotesActions.updateOneNoteSuccess,
    NavigationsActions.submitNoteTitleSuccess,
    (state, { payload }) => adapter.updateOne(payload, state),
  ),
  on(NotesActions.addOneNoteSuccess, (state, { payload }) =>
    adapter.addOne(payload, { ...state, pending: false }),
  ),
  on(NotesActions.deleteOneNoteSuccess, (state, { noteId }) =>
    adapter.removeOne(noteId, state),
  ),
  on(NotesActions.saveOneNote, state => ({
    ...state,
    pending: true,
  })),
  on(NotesActions.saveOneNoteSuccess, state => ({
    ...state,
    pending: false,
  })),
);

export const getPending = (state: NotesState) => state.pending;
export const getActiveNote = (state: NotesState) => state.activeNote;
