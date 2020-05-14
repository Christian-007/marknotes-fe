import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { INote } from '@app/shared/models/markdown-state.model';

export const getNotes = createAction('GET_NOTES');
export const getNotesSuccess = createAction(
  'GET_NOTES_SUCCESS',
  props<{ payload: INote[] }>(),
);
export const getNotesError = createAction('GET_NOTES_ERROR');
export const updateNote = createAction(
  'UPDATE_NOTE',
  props<{ payload: Partial<INote> }>(),
);
export const updateNoteSuccess = createAction(
  'UPDATE_NOTE_SUCCESS',
  props<{ payload: Update<INote> }>(),
);

export const addNote = createAction('ADD_NOTE');
export const addNoteSuccess = createAction(
  'ADD_NOTE_SUCCESS',
  props<{ payload: INote }>(),
);

export const deleteNote = createAction(
  'DELETE_NOTE',
  props<{ noteId: string; componentId: string }>(),
);
export const deleteNoteSuccess = createAction(
  'DELETE_NOTE_SUCCESS',
  props<{ noteId: string }>(),
);
