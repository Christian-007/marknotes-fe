import { InjectionToken } from '@angular/core';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromNavigation from '@app/shared/store/reducers/navigations.reducer';
import * as fromNotes from '@app/shared/store/reducers/notes.reducer';
import * as fromNoteDetail from '@app/shared/store/reducers/note-detail.reducer';
import { NoteDetailSelectors } from '../selectors';
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

// export const selectActiveNote = createSelector(
//   selectNotesState,
//   fromNotes.getActiveNote,
// );

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
  selectAllNotes,
  (notes: INote[]) => {
    return notes.length > 0;
  },
);
