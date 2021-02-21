import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { INote } from '@app/shared/models/markdown-state.model';

export const fetchAllNotes = createAction('FETCH_ALL_NOTES');
export const fetchAllNotesSuccess = createAction(
  'FETCH_ALL_NOTES_SUCCESS',
  props<{ payload: INote[] }>(),
);
export const fetchAllNotesError = createAction('FETCH_ALL_NOTES_ERROR');

export const updateOneNote = createAction(
  'UPDATE_NOTE',
  props<{ payload: Partial<INote> }>(),
);
export const updateOneNoteSuccess = createAction(
  'UPDATE_NOTE_SUCCESS',
  props<{ payload: Update<INote> }>(),
);

export const saveOneNote = createAction(
  'SAVE_NOTE',
  props<{ payload: Partial<INote> }>(),
);
export const saveOneNoteSuccess = createAction('SAVE_NOTE_SUCCESS');

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
