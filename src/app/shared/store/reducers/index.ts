import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromNotes from '@app/shared/store/reducers/notes.reducer';
import * as fromNavigation from '@app/shared/store/reducers/navigations.reducer';
import * as fromDynamicComponent from '@app/shared/store/reducers/dynamic-component.reducer';
import { INote } from '@app/shared/models/markdown-state.model';

export interface ApplicationState {
  [fromNotes.notesFeatureKey]: fromNotes.NotesState;
  [fromNavigation.navigationFeatureKey]: fromNavigation.NavigationState;
  [fromDynamicComponent.dynamicComponentFeatureKey]: fromDynamicComponent.DynamicComponentState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  [fromNotes.notesFeatureKey]: fromNotes.notesReducer,
  [fromNavigation.navigationFeatureKey]: fromNavigation.navigationReducer,
  [fromDynamicComponent.dynamicComponentFeatureKey]:
    fromDynamicComponent.dynamicComponentReducer,
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

// Dynamic Component Selectors
const selectDynamicComponetState = createFeatureSelector<
  ApplicationState,
  fromDynamicComponent.DynamicComponentState
>(fromDynamicComponent.dynamicComponentFeatureKey);

const selectDynamicComponentEntitiesState = createSelector(
  selectDynamicComponetState,
  state => state,
);

const {
  selectAll: selectAllComponents,
} = fromDynamicComponent.adapter.getSelectors();

export const selectAllDynamicComponents = createSelector(
  selectDynamicComponentEntitiesState,
  selectAllComponents,
);

// Mix Selectors
export const selectActiveNote = createSelector(
  selectActiveNoteId,
  selectAllNotes,
  (activeNoteId: string, allNotes: INote[]) => {
    const foundNote = allNotes.find(note => note.id === activeNoteId);
    const emptyNote: INote = {
      id: '-1',
      title: 'Untitled Document',
      dateCreated: Date.now(),
      htmlText: '<p>Hello this is 1</p>',
      markdownText: '',
    };
    return foundNote || emptyNote;
  },
);

export const selectIsPreviewAndActiveNote = createSelector(
  selectIsPreview,
  selectActiveNote,
  (isPreview: boolean, activeNote: INote) => ({ isPreview, activeNote }),
);
