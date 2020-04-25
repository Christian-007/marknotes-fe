import { createAction, props } from '@ngrx/store';

import { INote } from 'src/app/shared/services/store/markdown-state.model';

export const getNotes = createAction('GET_NOTES');
export const getNotesSuccess = createAction(
  'GET_NOTES_SUCCESS',
  props<{ payload: INote[] }>(),
);
export const getNotesError = createAction('GET_NOTES_ERROR');
