import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromNotes from 'src/app/pages/notes/shared/reducers/notes.reducer';
import * as fromNavigation from 'src/app/pages/notes/shared/reducers/navigations.reducer';

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
