import { Update } from '@ngrx/entity';

import * as fromNotes from '@app/shared/store/reducers/notes.reducer';
import { NotesActions, NavigationsActions } from '@app/shared/store/actions';
import { INote } from '@app/shared/models/markdown-state.model';

describe('NotesReducer', () => {
  const note: INote = {
    id: '1',
    dateCreated: 1590045443713,
    htmlText: '<h1>Hello</h1>',
    markdownText: '## Test',
    title: 'Testing Note',
  };
  const initialState: fromNotes.NotesState = {
    ids: [],
    entities: {},
    pending: false,
    error: null,
  };

  it('should return the initial state', () => {
    const result = fromNotes.notesReducer(undefined, {} as any);

    expect(result).toEqual(initialState);
  });

  it('should handle GET_NOTES', () => {
    const createAction = NotesActions.getAllNotes();
    const result = fromNotes.notesReducer(initialState, createAction);

    const expectedResult = {
      ...initialState,
      pending: true,
      error: null,
    };

    expect(result).toEqual(expectedResult);
  });

  it('should handle GET_NOTES_SUCCESS', () => {
    const stubNotes = [note];
    const createAction = NotesActions.getAllNotesSuccess({
      payload: stubNotes,
    });
    const result = fromNotes.notesReducer(initialState, createAction);

    const expectedResult = {
      ...initialState,
      ids: [stubNotes[0].id],
      entities: {
        [stubNotes[0].id]: stubNotes[0],
      },
      pending: false,
    };

    expect(result).toEqual(expectedResult);
  });

  it('should handle GET_NOTES_ERROR', () => {
    const createAction = NotesActions.getNotesError();
    const result = fromNotes.notesReducer(initialState, createAction);

    const expectedResult = {
      ...initialState,
      pending: false,
      error: 'Error',
    };

    expect(result).toEqual(expectedResult);
  });

  it('should handle PREVIEW_NOTE', () => {
    const stubState = {
      ...initialState,
      ids: [note.id],
      entities: {
        [note.id]: note,
      },
    };
    const stubNote: Update<INote> = {
      id: '1',
      changes: {
        htmlText: '<h1>Hello New</h1>',
      },
    };
    const createAction = NavigationsActions.previewNote({ payload: stubNote });
    const result = fromNotes.notesReducer(stubState, createAction);

    const expectedResult = {
      ...stubState,
      ids: [stubNote.id],
      entities: {
        [stubNote.id]: {
          ...stubState.entities[stubNote.id],
          ...stubNote.changes,
        },
      },
    };

    expect(result).toEqual(expectedResult);
  });
});
