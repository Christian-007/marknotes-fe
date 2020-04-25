import { createReducer, on, Action } from '@ngrx/store';

import { NotesActions } from '../actions';

export interface NotesReducerState {
  data: any[];
  pending: boolean;
  error: string;
}

const initialState: NotesReducerState = {
  data: [],
  pending: false,
  error: null,
};

const _notesReducer = createReducer(
  initialState,
  on(NotesActions.getNotes, state => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(NotesActions.getNotesSuccess, (state, { payload }) => ({
    ...state,
    data: payload,
    pending: false,
  })),
  on(NotesActions.getNotesError, state => ({
    ...state,
    pending: false,
    error: 'Error',
  })),
);

export function notesReducer(state: NotesReducerState, action: Action) {
  return _notesReducer(state, action);
}
