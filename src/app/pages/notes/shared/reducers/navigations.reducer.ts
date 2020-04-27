import { createReducer, on } from '@ngrx/store';

import { NavigationsActions } from '../actions';

export const navigationFeatureKey = 'navigations';

export interface NavigationState {
  activeNoteId: string;
}

const initialState: NavigationState = {
  activeNoteId: '-1',
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationsActions.clickNote, (state, { payload }) => ({
    ...state,
    activeNoteId: payload,
  })),
);

export const getActiveNoteId = (state: NavigationState) => state.activeNoteId;
