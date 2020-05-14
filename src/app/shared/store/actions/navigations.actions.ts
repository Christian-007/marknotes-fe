import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { INote } from '@app/shared/models/markdown-state.model';

export const clickNote = createAction(
  'CLICK_NOTE',
  props<{ payload: string }>(),
);

export const previewNote = createAction(
  'PREVIEW_NOTE',
  props<{ payload: Update<INote> }>(),
);

export const togglePreview = createAction('TOGGLE_PREVIEW');

export const clickEditTitle = createAction(
  'CLICK_EDIT_TITLE',
  props<{ isEditingTitle: boolean }>(),
);

export const submitNoteTitle = createAction(
  'SUBMIT_NOTE_TITLE',
  props<{ payload: Update<INote> }>(),
);
export const submitNoteTitleSuccess = createAction(
  'SUBMIT_NOTE_TITLE_SUCCESS',
  props<{ payload: Update<INote> }>(),
);
