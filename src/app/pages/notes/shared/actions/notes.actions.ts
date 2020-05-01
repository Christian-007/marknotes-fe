import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { INote } from 'src/app/shared/services/store/markdown-state.model';

export const getNotes = createAction('GET_NOTES');
export const getNotesSuccess = createAction(
  'GET_NOTES_SUCCESS',
  props<{ payload: INote[] }>(),
);
export const getNotesError = createAction('GET_NOTES_ERROR');
export const writeNote = createAction(
  'WRITE_NOTE',
  props<{ payload: Update<INote> }>(),
);
export const addNote = createAction('ADD_NOTE');
export const addNoteSuccess = createAction(
  'ADD_NOTE_SUCCESS',
  props<{ payload: INote }>(),
);
