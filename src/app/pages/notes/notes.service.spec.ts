import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Update } from '@ngrx/entity';

import { NotesService } from '@app/pages/notes/notes.service';
import { LocalStorageStrategy } from '@app/shared/services/storage-strategy/local-storage-strategy';
import { StorageStrategy } from '@app/shared/services/storage-strategy/storage-strategy';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';
import { INote } from '@app/shared/models/markdown-state.model';

describe('NotesService', () => {
  let notesService: NotesService;
  let localStorageStrategy: LocalStorageStrategy;

  beforeEach(() => {
    let localStorageStrategySpy = jasmine.createSpyObj('LocalStorageStrategy', [
      'load',
      'update',
      'create',
      'delete',
    ]);
    // mock the getter 'name' value
    localStorageStrategySpy = {
      ...localStorageStrategySpy,
      name: EStorageStrategy.LocalStorage,
    } as jasmine.SpyObj<LocalStorageStrategy>;

    const notesServiceFactory = (...storageStrategies: StorageStrategy[]) => {
      return new NotesService(storageStrategies);
    };
    const notesServiceProvider: Provider = {
      provide: NotesService,
      useFactory: notesServiceFactory,
      deps: [LocalStorageStrategy],
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageStrategy,
          useValue: localStorageStrategySpy,
        },
        notesServiceProvider,
      ],
    });

    notesService = TestBed.inject(NotesService);
    localStorageStrategy = TestBed.inject(LocalStorageStrategy);

    // Set LocalStorage as Strategy by default
    notesService.setStorageStrategy(EStorageStrategy.LocalStorage);
  });

  it('should set the strategy to LocalStorageStrategy if the strategy is LocalStorage', () => {
    const result = notesService.getStorageStrategy();

    expect(result).toEqual(localStorageStrategy);
  });

  it('should call strategy.load() when getNotes() is called', () => {
    const spy = localStorageStrategy.load as jasmine.Spy;

    notesService.getNotes();

    expect(spy.calls.any()).toBeTruthy();
  });

  it('should call strategy.update(payload) when updateNote(payload) is called', () => {
    const spy = localStorageStrategy.update as jasmine.Spy;
    const mockNotePayload: Update<INote> = {
      id: '1',
      changes: {
        title: 'Test Title',
      },
    };

    notesService.updateNote(mockNotePayload);

    expect(spy).toHaveBeenCalledWith(mockNotePayload);
  });

  it('should call strategy.create(note) when createNote(note) is called', () => {
    const spy = localStorageStrategy.create as jasmine.Spy;
    const mockNote: INote = {
      id: '1',
      dateCreated: 1590045443713,
      htmlText: '<h1>Hello</h1>',
      markdownText: '## Test',
      title: 'Testing Note',
    };

    notesService.createNote(mockNote);

    expect(spy).toHaveBeenCalledWith(mockNote);
  });

  it('should call strategy.delete(id) when deleteNote(id) is called', () => {
    const spy = localStorageStrategy.delete as jasmine.Spy;
    const mockId = '1';

    notesService.deleteNote(mockId);

    expect(spy).toHaveBeenCalledWith(mockId);
  });
});
