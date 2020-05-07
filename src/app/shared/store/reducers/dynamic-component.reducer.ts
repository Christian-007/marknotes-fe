import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { DynamicItem } from '@app/shared/models/dynamic-component.model';
import { NavigationsActions } from '../actions';
import { selectComponentId } from '@app/shared/utils/entity-adapter.util';

export const dynamicComponentFeatureKey = 'dynamicComponent';

export interface DynamicComponentState extends EntityState<DynamicItem> {}

export const adapter: EntityAdapter<DynamicItem> = createEntityAdapter<
  DynamicItem
>({
  selectId: selectComponentId,
});

const initialState: DynamicComponentState = adapter.getInitialState();

export const dynamicComponentReducer = createReducer(
  initialState,
  on(NavigationsActions.buildComponentSuccess, (state, { payload }) =>
    adapter.addOne(payload, state),
  ),
);
