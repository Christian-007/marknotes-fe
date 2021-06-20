import { createAction, props } from '@ngrx/store';

import { INote } from '@app/presentation/shared/models/markdown-state.model';

export const fetchAllNotes = createAction('[Notes] Fetch All Notes');
export const fetchAllNotesSuccess = createAction(
  '[Notes] Fetch All Notes Success',
  props<{ payload: INote[] }>(),
);
export const fetchAllNotesError = createAction('[Notes] Fetch All Notes Error');

export const saveOneNote = createAction(
  '[Notes] Save One Note',
  props<{ payload: Partial<INote> }>(),
);
export const saveOneNoteSuccess = createAction('[Notes] Save One Note Success');

export const addOneNote = createAction('[Notes] Add One Note');
export const addOneNoteSuccess = createAction(
  '[Notes] Add One Note Success',
  props<{ payload: INote }>(),
);

export const deleteOneNote = createAction(
  '[Notes] Delete One Note',
  props<{ noteId: string; componentId: string }>(),
);
export const deleteOneNoteSuccess = createAction(
  '[Notes] Delete One Note Success',
  props<{ noteId: string }>(),
);
