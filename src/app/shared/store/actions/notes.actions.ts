import { createAction, props } from '@ngrx/store';

import { INote } from '@app/shared/models/markdown-state.model';

export const fetchAllNotes = createAction('FETCH_ALL_NOTES');
export const fetchAllNotesSuccess = createAction(
  'FETCH_ALL_NOTES_SUCCESS',
  props<{ payload: INote[] }>(),
);
export const fetchAllNotesError = createAction('FETCH_ALL_NOTES_ERROR');

export const saveOneNote = createAction(
  'SAVE_ONE_NOTE',
  props<{ payload: Partial<INote> }>(),
);
export const saveOneNoteSuccess = createAction('SAVE_ONE_NOTE_SUCCESS');

export const addOneNote = createAction('ADD_ONE_NOTE');
export const addOneNoteSuccess = createAction(
  'ADD_ONE_NOTE_SUCCESS',
  props<{ payload: INote }>(),
);

export const deleteOneNote = createAction(
  'DELETE_ONE_NOTE',
  props<{ noteId: string; componentId: string }>(),
);
export const deleteOneNoteSuccess = createAction(
  'DELETE_ONE_NOTE_SUCCESS',
  props<{ noteId: string }>(),
);
