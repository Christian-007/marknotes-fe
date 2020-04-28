import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { INote } from 'src/app/shared/services/store/markdown-state.model';

export const clickNote = createAction(
  'CLICK_NOTE',
  props<{ payload: string }>(),
);

export const showEditor = createAction('SHOW_EDITOR');

export const previewNote = createAction(
  'PREVIEW_NOTE',
  props<{ payload: Update<INote> }>(),
);
