import * as fromRoot from '@app/shared/store/reducers';
import { INote } from '@app/shared/models/markdown-state.model';
import * as fromNotes from '@app/shared/store/reducers/notes.reducer';

describe('Selectors', () => {
  let mockNotes1: INote;
  let mockNotes2: INote;
  let mockNotesState: fromNotes.NotesState;
  let mockAppState: fromRoot.ApplicationState;

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

    mockAppState = {
      navigations: {
        activeNoteId: '',
        isEditingTitle: false,
        isNoteListOpen: false,
        isPreview: false,
      },
      notes: mockNotesState,
    };
  });

  it('should select NotesState only from ApplicationState', () => {
    const result = fromRoot.selectNotesState(mockAppState);
    expect(result).toBe(mockNotesState);
  });

  it('should select all notes in a denormalized shape', () => {
    // mockNotesState is in a normalized shape
    const result = fromRoot.selectAllNotes.projector(mockNotesState);
    const expected = [mockNotes1, mockNotes2];

    expect(result).toEqual(expected);
  });

  it('should select active note "mockNote2" when activeNoteId is "2"', () => {
    const stubActiveNoteId = '2';
    const stubNotesArray = [mockNotes1, mockNotes2];
    const result = fromRoot.selectActiveNote.projector(
      stubActiveNoteId,
      stubNotesArray,
    );

    expect(result).toEqual(mockNotes2);
  });

  it('should select undefined when activeNoteId does not exist', () => {
    const stubNoteId = '3';
    const stubNotesArray = [mockNotes1, mockNotes2];
    const result = fromRoot.selectActiveNote.projector(
      stubNoteId,
      stubNotesArray,
    );

    expect(result).toBe(undefined);
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
      const result = fromRoot.selectNotesPending.projector(mockNotesState);
      expect(result).toBe(mockNotesState.pending);
    });
  });
});
