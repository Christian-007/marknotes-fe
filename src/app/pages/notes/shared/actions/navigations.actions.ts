import { createAction, props } from '@ngrx/store';

export const clickNote = createAction(
  'CLICK_NOTE',
  props<{ payload: number }>(),
);
