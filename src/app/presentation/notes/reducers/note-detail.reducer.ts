import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import {
  NavigationsActions,
  NoteDetailActions,
  NotesActions,
} from '../actions';

import { INote } from '@app/shared/models/markdown-state.model';

export const featureKey = 'noteDetail';

export interface State extends EntityState<INote> {
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<INote> = createEntityAdapter<INote>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(NoteDetailActions.fetchOneNote, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(NoteDetailActions.fetchOneNoteSuccess, (state, { payload }) =>
    adapter.setAll([payload], { ...state, loading: false }),
  ),
  on(NotesActions.deleteOneNoteSuccess, (state, { noteId }) =>
    adapter.removeOne(noteId, state),
  ),
  on(
    NavigationsActions.previewNote,
    NavigationsActions.submitNoteTitleSuccess,
    NoteDetailActions.updateOneNoteSuccess,
    (state, { payload }) => adapter.updateOne(payload, state),
  ),
);

export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
