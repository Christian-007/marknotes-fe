import { TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { NotesEffects } from '@app/shared/store/effects/notes.effects';
import { NotesService } from '@app/pages/notes/notes.service';
import { NotesActions, NavigationsActions } from '@app/shared/store/actions';
import * as fromRoot from '@app/shared/store/reducers';
import { MarkdownParser } from '@app/shared/services/markdown-parser/markdown-parser';
import { ComponentCreator } from '@app/shared/services/component-creator/component-creator';
import { INote } from '@app/shared/models/markdown-state.model';
import { NoteUtil } from '@app/shared/utils/note.util';
import { TransformationUtil } from '@app/shared/utils/transformation.util';

describe('NotesEffects', () => {
  let effects: NotesEffects;
  let notesService: NotesService;
  let markdownParser: MarkdownParser;
  let componentCreator: ComponentCreator;
  let mockStore: MockStore;
  let mockSelectActiveNoteIdSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    string
  >;
  let mockSelectAllNotesSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    INote[]
  >;
  let mockSelectIsPreviewAndActiveNoteSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    { isPreview: boolean; activeNote: INote }
  >;
  let actions$: Observable<any>;

  const notesServiceSpy = jasmine.createSpyObj('NotesService', [
    'setStorageStrategy',
    'fetchAll',
    'updateOne',
    'createNote',
    'deleteNote',
  ]);
  const markdownParserSpy = jasmine.createSpyObj('Marked', ['convert']);
  const componentCreatorSpy = jasmine.createSpyObj('ComponentCreator', [
    'destroy',
  ]);

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
        {
          provide: ComponentCreator,
          useValue: componentCreatorSpy,
        },
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(NotesEffects);
    notesService = TestBed.inject(NotesService);
    markdownParser = TestBed.inject(MarkdownParser);
    componentCreator = TestBed.inject(ComponentCreator);
    mockStore = TestBed.inject(MockStore);
    actions$ = TestBed.inject(Actions);
    mockSelectActiveNoteIdSelector = mockStore.overrideSelector(
      fromRoot.selectActiveNoteId,
      '1', // mock activeNoteId
    );
    mockSelectAllNotesSelector = mockStore.overrideSelector(
      fromRoot.selectAllNotes,
      [],
    );
    mockSelectIsPreviewAndActiveNoteSelector = mockStore.overrideSelector(
      fromRoot.selectIsPreviewAndActiveNote,
      {
        isPreview: false,
        activeNote: {
          id: '1',
          dateCreated: 1590045443713,
          htmlText: '<h1>Hello</h1>',
          markdownText: '## Test',
          title: 'Testing Note',
        },
      },
    );
  });

  it('should return NotesActions.fetchAllNotesSuccess, with the notes, on success', () => {
    const action = NotesActions.fetchAllNotes();
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
    const completion = NotesActions.fetchAllNotesSuccess({
      payload: [note1, note2],
    });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: [note1, note2] });
    const expected$ = cold('--c', { c: completion });

    const spy = notesService.fetchAll as jasmine.Spy;
    spy.and.returnValue(response$);

    expect(effects.fetchAllNotes$).toBeObservable(expected$);
  });

  it('should return NotesActions.fetchAllNotesError, on fail', () => {
    const action = NotesActions.fetchAllNotes();
    const stubError = 'Error!';
    const completion = NotesActions.fetchAllNotesError();

    actions$ = hot('-a', { a: action });
    const response$ = cold('-#', {}, stubError);
    const expected$ = cold('--c', { c: completion });

    const spy = notesService.fetchAll as jasmine.Spy;
    spy.and.returnValue(response$);

    expect(effects.fetchAllNotes$).toBeObservable(expected$);
  });

  it('should call NotesService.updateOne when updateOneNote$ is dispatched', () => {
    // Mock data
    const stubActiveNoteId = '1';
    const stubNoteChanges: Partial<INote> = {
      title: 'Test Title',
    };
    const mockNotePayload: Update<INote> = {
      id: stubActiveNoteId,
      changes: stubNoteChanges,
    };

    // Mock action Observable and response from NoteService
    const action = NotesActions.updateOneNote({
      payload: stubNoteChanges,
    });
    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: 'whatever' });

    const spy = notesService.updateOne as jasmine.Spy;
    spy.and.returnValue(response$);

    mockSelectActiveNoteIdSelector.setResult(stubActiveNoteId);
    mockStore.refreshState();

    effects.updateOneNote$.subscribe(() => {
      expect(spy).toHaveBeenCalledWith(mockNotePayload);
    });
  });

  it('should return NotesActions.updateOneNoteSuccess, with note changes, on success', () => {
    // Mock data
    const mockNoteChanges: Partial<INote> = {
      title: 'Test Title',
    };
    const mockNotePayload: Update<INote> = {
      id: '1',
      changes: mockNoteChanges,
    };

    // Mock action Observable and response from NoteService
    const action = NotesActions.updateOneNote({
      payload: mockNoteChanges,
    });
    const completion = NotesActions.updateOneNoteSuccess({
      payload: mockNotePayload,
    });
    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: 'whatever' });
    const expected$ = cold('--c', { c: completion });

    const spy = notesService.updateOne as jasmine.Spy;
    spy.and.returnValue(response$);

    mockSelectActiveNoteIdSelector.setResult('1');
    mockStore.refreshState();

    expect(effects.updateOneNote$).toBeObservable(expected$);
  });

  it('should call NotesService.updateOneNote when saveNote$ is dispatched', () => {
    // Mock data
    const stubActiveNoteId = '1';
    const stubNoteChanges: Partial<INote> = {
      title: 'Test Title',
    };
    const mockNotePayload: Update<INote> = {
      id: stubActiveNoteId,
      changes: stubNoteChanges,
    };

    // Mock action Observable and response from NoteService
    const action = NotesActions.saveNote({
      payload: stubNoteChanges,
    });
    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: 'whatever' });

    const spy = notesService.updateOne as jasmine.Spy;
    spy.and.returnValue(response$);

    mockSelectActiveNoteIdSelector.setResult(stubActiveNoteId);
    mockStore.refreshState();

    effects.saveNote$.subscribe(() => {
      expect(spy).toHaveBeenCalledWith(mockNotePayload);
    });
  });

  it('should call createDefaultNote() when addNote$ is dispatched', () => {
    const createDefaultNoteSpy = spyOn(NoteUtil, 'createDefault');

    const action = NotesActions.addNote();
    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: 'whatever' });

    const spy = notesService.createNote as jasmine.Spy;
    spy.and.returnValue(response$);

    effects.addNote$.subscribe(() => {
      expect(createDefaultNoteSpy).toHaveBeenCalled();
    });
  });

  it('should return NotesActions.addNoteSuccess, with note, on success', () => {
    const mockNoteData: INote = {
      id: '1',
      dateCreated: 1590045443715,
      htmlText: '<h1>Second</h1>',
      markdownText: '## Second',
      title: 'Testing Note 2',
    };
    spyOn(NoteUtil, 'createDefault').and.returnValue(mockNoteData);

    const action = NotesActions.addNote();
    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: 'whatever' });

    const spy = notesService.createNote as jasmine.Spy;
    spy.and.returnValue(response$);

    effects.addNote$.subscribe(() => {
      expect(spy).toHaveBeenCalledWith(mockNoteData);
    });
  });

  it('should call NotesService.deleteNote when deleteNote$ is dispatched', () => {
    const mockActiveNoteId = '1';
    const stubComponentId = '1';
    const action = NotesActions.deleteNote({
      noteId: mockActiveNoteId,
      componentId: stubComponentId,
    });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: 'whatever' });

    const spy = notesService.deleteNote as jasmine.Spy;
    spy.and.returnValue(response$);

    effects.deleteNote$.subscribe(() => {
      expect(spy).toHaveBeenCalledWith(mockActiveNoteId);
    });
  });

  it('should call ComponentCreator.destroy when deleteNote$ is dispatched', () => {
    const mockActiveNoteId = '1';
    const stubComponentId = '1';
    const action = NotesActions.deleteNote({
      noteId: mockActiveNoteId,
      componentId: stubComponentId,
    });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: 'whatever' });

    const spyNoteService = notesService.deleteNote as jasmine.Spy;
    spyNoteService.and.returnValue(response$);

    const spyComponentCreator = componentCreator.destroy as jasmine.Spy;

    effects.deleteNote$.subscribe(() => {
      expect(spyComponentCreator).toHaveBeenCalledWith(stubComponentId);
    });
  });

  it('should return NotesActions.deleteNoteSuccess, when deleteNote$, on success', () => {
    const mockActiveNoteId = '1';
    const stubComponentId = '1';
    const action = NotesActions.deleteNote({
      noteId: mockActiveNoteId,
      componentId: stubComponentId,
    });
    const completion = NotesActions.deleteNoteSuccess({
      noteId: mockActiveNoteId,
    });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-p|', { p: 'whatever' });
    const expected$ = cold('--c', { c: completion });

    const spy = notesService.deleteNote as jasmine.Spy;
    spy.and.returnValue(response$);

    expect(effects.deleteNote$).toBeObservable(expected$);
  });

  it('should call ComponentCreator.destroy and return EMPTY, when deleteNote$, on fail', () => {
    const mockActiveNoteId = '1';
    const stubComponentId = '1';
    const stubError = 'Error!';
    const action = NotesActions.deleteNote({
      noteId: mockActiveNoteId,
      componentId: stubComponentId,
    });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-#', {}, stubError);
    const expected$ = cold(''); // equivalent of EMPTY

    const spyNoteService = notesService.deleteNote as jasmine.Spy;
    spyNoteService.and.returnValue(response$);

    const spyComponentCreator = componentCreator.destroy as jasmine.Spy;

    effects.deleteNote$.subscribe(
      () => {},
      () => {
        expect(spyComponentCreator).toHaveBeenCalledWith(
          stubComponentId,
          'should call destroy component',
        );
      },
    );

    expect(effects.deleteNote$).toBeObservable(
      expected$,
      'should return EMPTY',
    );
  });

  it('should return NavigationsActions.clickNote, on deleteNoteSuccess, when setActiveNote$ is dispatched', () => {
    const mockActiveNoteId = '1';
    const stubNotes: INote[] = [
      {
        id: '3',
        dateCreated: 1590045443715,
        htmlText: '<h1>Second</h1>',
        markdownText: '## Second',
        title: 'Testing Note 2',
      },
      {
        id: '1',
        dateCreated: 1590045443715,
        htmlText: '<h1>Second</h1>',
        markdownText: '## Second',
        title: 'Testing Note 2',
      },
    ];
    const mockFirstNoteId = stubNotes[0].id;
    const action = NotesActions.deleteNoteSuccess({
      noteId: mockActiveNoteId,
    });
    const completion = NavigationsActions.clickNote({
      payload: mockFirstNoteId,
    });

    actions$ = hot('-a', { a: action });
    const expected$ = cold('-c', { c: completion });

    mockSelectAllNotesSelector.setResult(stubNotes);
    mockStore.refreshState();

    expect(effects.setActiveNoteId$).toBeObservable(expected$);
  });

  it('should return EMPTY, if there is no notes left, when setActiveNote$ is dispatched', () => {
    const mockActiveNoteId = '1';
    const action = NotesActions.deleteNoteSuccess({
      noteId: mockActiveNoteId,
    });

    actions$ = hot('-a', { a: action });
    const expected$ = cold(''); // equivalent of EMPTY

    mockSelectAllNotesSelector.setResult([]);
    mockStore.refreshState();

    expect(effects.setActiveNoteId$).toBeObservable(expected$);
  });

  it('should return NavigationsActions.previewNote, when togglePreview$, on success', () => {
    const stubTitleAndBody = `# Test Title\n ## Some Markdown`;
    const stubHtml = `<h1>Test Title</h1><h2>Some Markdown</h2>`;
    const mockPayload: Update<INote> = {
      id: '1',
      changes: {
        htmlText: stubHtml,
      },
    };

    // Spy on regular function
    const combineTitleWithBodySpy = spyOn(
      TransformationUtil,
      'combineTitleWithBody',
    );
    combineTitleWithBodySpy.and.returnValue(stubTitleAndBody);
    const convertNoteSpy = markdownParser.convert as jasmine.Spy;
    convertNoteSpy.and.returnValue(stubHtml);

    const action = NavigationsActions.togglePreview();
    const completion = NavigationsActions.previewNote({
      payload: mockPayload,
    });

    actions$ = hot('-a', { a: action });
    const expected$ = cold('-c', { c: completion });

    mockSelectIsPreviewAndActiveNoteSelector.setResult({
      isPreview: true,
      activeNote: {
        id: '1',
        dateCreated: 1590045443715,
        htmlText: '',
        markdownText: '## Some Markdown',
        title: 'Test Title',
      },
    });
    mockStore.refreshState();

    expect(effects.togglePreview$).toBeObservable(expected$);
  });

  it('should return EMPTY if NOT in Preview Mode, when togglePreview$', () => {
    const action = NavigationsActions.togglePreview();

    actions$ = hot('-a', { a: action });
    const expected$ = cold('');

    mockSelectIsPreviewAndActiveNoteSelector.setResult({
      isPreview: false,
      activeNote: {
        id: '1',
        dateCreated: 1590045443715,
        htmlText: '',
        markdownText: '## Some Markdown',
        title: 'Test Title',
      },
    });
    mockStore.refreshState();

    expect(effects.togglePreview$).toBeObservable(expected$);
  });
});
