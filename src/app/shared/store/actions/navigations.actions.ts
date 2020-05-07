import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { INote } from '@app/shared/models/markdown-state.model';
import {
  DynamicComponentRef,
  DynamicItemRef,
} from '@app/shared/models/dynamic-component.model';

export const clickNote = createAction(
  'CLICK_NOTE',
  props<{ payload: string }>(),
);

export const previewNote = createAction(
  'PREVIEW_NOTE',
  props<{ payload: Update<INote> }>(),
);

export const togglePreview = createAction('TOGGLE_PREVIEW');

export const buildComponent = createAction(
  'BUILD_COMPONENT',
  props<{ payload: DynamicItemRef }>(),
);

export const buildComponentSuccess = createAction(
  'BUILD_COMPONENT_SUCCESS',
  props<{ payload: DynamicComponentRef }>(),
);
