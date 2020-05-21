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

export const reducers: ActionReducerMap<ApplicationState> = {
  [fromNotes.notesFeatureKey]: fromNotes.notesReducer,
  [fromNavigation.navigationFeatureKey]: fromNavigation.navigationReducer,
};

// Notes Selectors
const selectNotesState = createFeatureSelector<
  ApplicationState,
  fromNotes.NotesState
>(fromNotes.notesFeatureKey);

const selectNoteEntitiesState = createSelector(
  selectNotesState,
  state => state,
);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = fromNotes.adapter.getSelectors();

export const selectAllNotes = createSelector(
  selectNoteEntitiesState,
  selectAll,
);

export const selectNotesPending = createSelector(
  selectNoteEntitiesState,
  fromNotes.getPending,
);

// Navigation Selectors
const selectNavigationState = createFeatureSelector<
  ApplicationState,
  fromNavigation.NavigationState
>(fromNavigation.navigationFeatureKey);

const selectNavigationEntitiesState = createSelector(
  selectNavigationState,
  state => state,
);

export const selectActiveNoteId = createSelector(
  selectNavigationEntitiesState,
  fromNavigation.getActiveNoteId,
);

export const selectIsPreview = createSelector(
  selectNavigationEntitiesState,
  fromNavigation.getIsPreview,
);

export const isEditingTitle = createSelector(
  selectNavigationEntitiesState,
  fromNavigation.getisEditingTitle,
);

export const isNoteListOpen = createSelector(
  selectNavigationEntitiesState,
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
