import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApplicationState } from '../reducers';
import * as fromNoteDetail from '../reducers/note-detail.reducer';

import { INote } from '@app/shared/models/markdown-state.model';

// Select note detail state from ApplicationState in a normalized shape
export const selectFeatureState = createFeatureSelector<
  ApplicationState,
  fromNoteDetail.State
>(fromNoteDetail.featureKey);

const { selectAll } = fromNoteDetail.adapter.getSelectors();

// Select note detail state in a denormalized shape
export const selectAllEntities = createSelector(selectFeatureState, selectAll);

export const selectOne = createSelector(
  selectAllEntities,
  (noteDetail: INote[]) => noteDetail[0],
);
