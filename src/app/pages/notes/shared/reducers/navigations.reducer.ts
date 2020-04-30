import { createReducer, on } from '@ngrx/store';

import { NavigationsActions } from '../actions';

export const navigationFeatureKey = 'navigations';

export interface NavigationState {
  activeNoteId: string;
  isPreview: boolean;
}

const initialState: NavigationState = {
  activeNoteId: '-1',
  isPreview: false,
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationsActions.clickNote, (state, { payload }) => ({
    ...state,
    activeNoteId: payload,
  })),
  on(NavigationsActions.togglePreview, state => ({
    ...state,
    isPreview: !state.isPreview,
  })),
);

export const getActiveNoteId = (state: NavigationState) => state.activeNoteId;
export const getIsPreview = (state: NavigationState) => state.isPreview;
