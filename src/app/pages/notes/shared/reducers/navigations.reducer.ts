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
  on(NavigationsActions.showEditor, state => ({
    ...state,
    isPreview: false,
  })),
  on(NavigationsActions.previewNote, state => ({
    ...state,
    isPreview: true,
  })),
);

export const getActiveNoteId = (state: NavigationState) => state.activeNoteId;
export const getIsPreview = (state: NavigationState) => state.isPreview;
