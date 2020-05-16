import { createReducer, on } from '@ngrx/store';

import { NavigationsActions } from '../actions';

export const navigationFeatureKey = 'navigations';

export interface NavigationState {
  activeNoteId: string;
  isPreview: boolean;
  isEditingTitle: boolean;
  isNoteListOpen: boolean;
}

const initialState: NavigationState = {
  activeNoteId: '-1',
  isPreview: false,
  isEditingTitle: false,
  isNoteListOpen: false,
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationsActions.clickNote, (state, { payload }) => ({
    ...state,
    activeNoteId: payload,
    isEditingTitle: false,
  })),
  on(NavigationsActions.togglePreview, state => ({
    ...state,
    isPreview: !state.isPreview,
  })),
  on(NavigationsActions.clickEditTitle, (state, { isEditingTitle }) => ({
    ...state,
    isEditingTitle,
  })),
  on(NavigationsActions.submitNoteTitleSuccess, state => ({
    ...state,
    isEditingTitle: false,
  })),
  on(NavigationsActions.openNoteList, state => ({
    ...state,
    isNoteListOpen: true,
  })),
  on(NavigationsActions.closeNoteList, state => ({
    ...state,
    isNoteListOpen: false,
  })),
);

export const getActiveNoteId = (state: NavigationState) => state.activeNoteId;
export const getIsPreview = (state: NavigationState) => state.isPreview;
export const getisEditingTitle = (state: NavigationState) =>
  state.isEditingTitle;
export const getIsNoteListOpen = (state: NavigationState) =>
  state.isNoteListOpen;
