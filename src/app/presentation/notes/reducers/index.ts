import { InjectionToken } from '@angular/core';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
} from '@ngrx/store';

import { NoteDetailSelectors, NotesSelector } from '../selectors';

import * as fromNavigation from '@app/presentation/notes/reducers/navigations.reducer';
import * as fromNotes from '@app/presentation/notes/reducers/notes.reducer';
import * as fromNoteDetail from '@app/presentation/notes/reducers/note-detail.reducer';
import { INote } from '@app/shared/models/markdown-state.model';

export interface ApplicationState {
  [fromNavigation.navigationFeatureKey]: fromNavigation.NavigationState;
  [fromNotes.notesFeatureKey]: fromNotes.NotesState;
  [fromNoteDetail.featureKey]: fromNoteDetail.State;
}

export const REDUCERS_TOKEN = new InjectionToken<
  ActionReducerMap<ApplicationState>
>('Registered Reducers');

export const reducers: ActionReducerMap<ApplicationState> = {
  [fromNavigation.navigationFeatureKey]: fromNavigation.navigationReducer,
  [fromNotes.notesFeatureKey]: fromNotes.notesReducer,
  [fromNoteDetail.featureKey]: fromNoteDetail.reducer,
};

// Navigation Selectors
export const selectNavigationState = createFeatureSelector<
  ApplicationState,
  fromNavigation.NavigationState
>(fromNavigation.navigationFeatureKey);

export const selectActiveNoteId = createSelector(
  selectNavigationState,
  fromNavigation.getActiveNoteId,
);

export const selectIsPreview = createSelector(
  selectNavigationState,
  fromNavigation.getIsPreview,
);

export const isEditingTitle = createSelector(
  selectNavigationState,
  fromNavigation.getisEditingTitle,
);

export const isNoteListOpen = createSelector(
  selectNavigationState,
  fromNavigation.getIsNoteListOpen,
);

// Mix Selectors
export const selectIsPreviewAndActiveNote = createSelector(
  selectIsPreview,
  NoteDetailSelectors.selectOne,
  (isPreview: boolean, activeNote: INote) => ({ isPreview, activeNote }),
);

export const hasNotesInStorage = createSelector(
  NotesSelector.selectAllNotes,
  (notes: INote[]) => {
    return notes.length > 0;
  },
);
