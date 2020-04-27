import { createReducer, on } from '@ngrx/store';

import { NavigationsActions } from '../actions';

export const navigationFeatureKey = 'navigations';

export interface NavigationState {
  activeNoteId: number;
}

const initialState: NavigationState = {
  activeNoteId: 0,
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationsActions.clickNote, (state, { payload }) => ({
    ...state,
    activeNoteId: payload,
  })),
);

export const getActiveNoteId = (state: NavigationState) => state.activeNoteId;
