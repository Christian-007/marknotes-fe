import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { INote } from '@app/presentation/shared/models/markdown-state.model';

export const clickNote = createAction(
  '[Navigations] Click Note',
  props<{ payload: string }>(),
);

export const previewNote = createAction(
  '[Navigations] Preview Note',
  props<{ payload: Update<INote> }>(),
);

export const togglePreview = createAction('[Navigations] Toggle Preview');

export const clickEditTitle = createAction(
  '[Navigations] Click Edit Title',
  props<{ isEditingTitle: boolean }>(),
);

export const submitNoteTitle = createAction(
  '[Navigations] Submit Note Title',
  props<{ payload: Update<INote> }>(),
);
export const submitNoteTitleSuccess = createAction(
  '[Navigations] Submit Note Title Success',
  props<{ payload: Update<INote> }>(),
);

export const openNoteList = createAction('OPEN_NOTE_LIST');
export const closeNoteList = createAction('CLOSE_NOTE_LIST');
