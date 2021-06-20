import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { INote } from '@app/presentation/shared/models/markdown-state.model';

export const fetchOneNote = createAction(
  '[Note Detail] Fetch One Note',
  props<{ noteId: string }>(),
);
export const fetchOneNoteSuccess = createAction(
  '[Note Detail] Fetch One Note Success',
  props<{ payload: INote }>(),
);

export const updateOneNote = createAction(
  '[Note Detail] Update One Note',
  props<{ payload: Partial<INote> }>(),
);
export const updateOneNoteSuccess = createAction(
  '[Note Detail] Update One Note Success',
  props<{ payload: Update<INote> }>(),
);
