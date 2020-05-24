import { InjectionToken } from '@angular/core';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromNotes from '@app/shared/store/reducers/notes.reducer';
import * as fromNavigation from '@app/shared/store/reducers/navigations.reducer';
import { INote } from '@app/shared/models/markdown-state.model';

export interface ApplicationState {
  [fromNotes.notesFeatureKey]: fromNotes.NotesState;
  [fromNavigation.navigationFeatureKey]: fromNavigation.NavigationState;
}

export const REDUCERS_TOKEN = new InjectionToken<
  ActionReducerMap<ApplicationState>
>('Registered Reducers');

export const reducers: ActionReducerMap<ApplicationState> = {
  [fromNotes.notesFeatureKey]: fromNotes.notesReducer,
  [fromNavigation.navigationFeatureKey]: fromNavigation.navigationReducer,
};

// Notes Selectors
export const selectNotesState = createFeatureSelector<
  ApplicationState,
  fromNotes.NotesState
>(fromNotes.notesFeatureKey);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = fromNotes.adapter.getSelectors();

export const selectAllNotes = createSelector(selectNotesState, selectAll);

export const selectNotesPending = createSelector(
  selectNotesState,
  fromNotes.getPending,
);

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
export const selectActiveNote = createSelector(
  selectActiveNoteId,
  selectAllNotes,
  (activeNoteId: string, allNotes: INote[]) => {
    const foundNote = allNotes.find(note => note.id === activeNoteId);
    return foundNote;
  },
);

export const selectIsPreviewAndActiveNote = createSelector(
  selectIsPreview,
  selectActiveNote,
  (isPreview: boolean, activeNote: INote) => ({ isPreview, activeNote }),
);

export const hasNotesInStorage = createSelector(
  selectAllNotes,
  (notes: INote[]) => {
    return notes.length > 0;
  },
);
