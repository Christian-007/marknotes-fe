import { NoteDetailSelectors, NotesSelector } from './';
import * as fromRoot from '../reducers';
import * as fromNotes from '../reducers/notes.reducer';
import * as fromNoteDetail from '../reducers/note-detail.reducer';

import { INote } from '@app/shared/models/markdown-state.model';

describe('Selectors', () => {
  let mockNotes1: INote;
  let mockNotes2: INote;
  let mockNotesState: fromNotes.NotesState;
  let mockAppState: fromRoot.ApplicationState;
  let mockNoteDetailState: fromNoteDetail.State;

  beforeEach(() => {
    mockNotes1 = {
      id: '1',
      dateCreated: 1590045443713,
      htmlText: '<h1>Note 1</h1>',
      markdownText: '## Note 1',
      title: 'Note 1 Title',
    };
    mockNotes2 = {
      id: '2',
      dateCreated: 1590045443733,
      htmlText: '<h1>Note 2</h1>',
      markdownText: '## Note 2',
      title: 'Note 2 Title',
    };
    mockNotesState = {
      entities: {
        [mockNotes1.id]: mockNotes1,
        [mockNotes2.id]: mockNotes2,
      },
      ids: [mockNotes1.id, mockNotes2.id],
      error: null,
      pending: false,
    };
    mockNoteDetailState = {
      entities: {
        [mockNotes1.id]: mockNotes1,
      },
      ids: [mockNotes1.id],
      loading: false,
      error: null,
    };

    mockAppState = {
      navigations: {
        activeNoteId: '',
        isEditingTitle: false,
        isNoteListOpen: false,
        isPreview: false,
      },
      notes: mockNotesState,
      noteDetail: mockNoteDetailState,
    };
  });

  it('should select NotesState only from ApplicationState', () => {
    const result = NotesSelector.selectFeatureState(mockAppState);
    expect(result).toBe(mockNotesState);
  });

  it('should select NoteDetailState only from ApplicationState', () => {
    const result = NoteDetailSelectors.selectFeatureState(mockAppState);
    expect(result).toBe(mockNoteDetailState);
  });

  it('should select all entities of fromNoteDetail.State in a denormalized shape', () => {
    const result = NoteDetailSelectors.selectAllEntities.projector(
      mockNoteDetailState,
    );
    const expected = [mockNotes1];

    expect(result).toEqual(expected);
  });

  it('should select a single note detail in a denormalized-shape fromNoteDetail.State', () => {
    const denormalized = NoteDetailSelectors.selectAllEntities.projector(
      mockNoteDetailState,
    );
    const result = NoteDetailSelectors.selectOne.projector(denormalized);
    const expected = mockNotes1;

    expect(result).toEqual(expected);
  });

  it('should select all notes in a denormalized shape', () => {
    // mockNotesState is in a normalized shape
    const result = NotesSelector.selectAllNotes.projector(mockNotesState);
    const expected = [mockNotes1, mockNotes2];

    expect(result).toEqual(expected);
  });

  it('should select one latest note if there are some notes', () => {
    const denormalized = NotesSelector.selectAllNotes.projector(mockNotesState);
    const result = NotesSelector.selectOneLatestNote.projector(denormalized);
    const expected = mockNotes1;

    expect(result).toBe(expected);
  });

  it('should select isPreview and activeNote states', () => {
    const stubIsPreview = false;
    const stubActiveNote = mockNotes1;
    const result = fromRoot.selectIsPreviewAndActiveNote.projector(
      stubIsPreview,
      stubActiveNote,
    );
    const expected = { isPreview: stubIsPreview, activeNote: stubActiveNote };

    expect(result).toEqual(expected);
  });

  describe('NotesSelectors', () => {
    it('should get pending value from NotesState', () => {
      const result = fromNotes.getPending(mockNotesState);
      expect(result).toBe(mockNotesState.pending);
    });

    it('should select pending state from NotesState', () => {
      const result = NotesSelector.selectNotesPending.projector(mockNotesState);
      expect(result).toBe(mockNotesState.pending);
    });
  });
});
