import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { NotesEffects } from '@app/shared/store/effects/notes.effects';
import { NotesService } from '@app/pages/notes/notes.service';
import { NotesActions } from '@app/shared/store/actions';
import { ApplicationState } from '@app/shared/store/reducers';
import { MarkdownParser } from '@app/shared/services/markdown-parser/markdown-parser';
import { Marked } from '@app/shared/services/markdown-parser/marked';

describe('NotesEffects', () => {
  let effects: NotesEffects;
  let notesService: NotesService;
  let markdownParser: Marked;
  let mockStore: MockStore<ApplicationState>;
  let actions$: Observable<any>;

  const notesServiceSpy = jasmine.createSpyObj('NotesService', [
    'setStorageStrategy',
    'getNotes',
    'updateNote',
    'createNote',
    'deleteNote',
  ]);
  const markdownParserSpy = jasmine.createSpyObj('Marked', ['convert']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotesEffects,
        {
          provide: NotesService,
          useValue: notesServiceSpy,
        },
        {
          provide: MarkdownParser,
          useValue: markdownParserSpy,
        },
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(NotesEffects);
    notesService = TestBed.get(NotesService);
    markdownParser = TestBed.get(MarkdownParser);
    mockStore = TestBed.get(Store);
    actions$ = TestBed.get(Actions);
  });

  it('should return NotesActions.getNotesSuccess, with the notes, on success', () => {
    const action = NotesActions.getNotes();
    const note1 = {
      id: '1',
      dateCreated: 1590045443713,
      htmlText: '<h1>Hello</h1>',
      markdownText: '## Test',
      title: 'Testing Note',
    };

    const note2 = {
      id: '2',
      dateCreated: 1590045443715,
      htmlText: '<h1>Second</h1>',
      markdownText: '## Second',
      title: 'Testing Note 2',
    };
    const completion = NotesActions.getNotesSuccess({
      payload: [note1, note2],
    });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: [note1, note2] });
    const expected$ = cold('--c', { c: completion });

    const spy = notesService.getNotes as jasmine.Spy;
    spy.and.returnValue(response$);

    expect(effects.getNotes$).toBeObservable(expected$);
  });

  it('should return NotesActions.getNotesError, on fail', () => {
    const action = NotesActions.getNotes();
    const stubError = 'Error!';
    const completion = NotesActions.getNotesError();

    actions$ = hot('-a', { a: action });
    const response$ = cold('-#', {}, stubError);
    const expected$ = cold('--c', { c: completion });

    const spy = notesService.getNotes as jasmine.Spy;
    spy.and.returnValue(response$);

    expect(effects.getNotes$).toBeObservable(expected$);
  });
});
