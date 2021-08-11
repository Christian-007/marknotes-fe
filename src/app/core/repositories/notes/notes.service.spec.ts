import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Update } from '@ngrx/entity';

import { NotesService } from './notes.service';

import { LocalStorageStrategy } from '@app/core/repositories/notes/strategy/local-storage-strategy';
import { NotesStrategy } from '@app/core/repositories/notes/strategy/notes-strategy';
import { ENotesStrategy } from '@app/shared/enums/notes-strategy.enum';
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
      name: ENotesStrategy.LocalStorage,
    } as jasmine.SpyObj<LocalStorageStrategy>;

    const notesServiceFactory = (...storageStrategies: NotesStrategy[]) => {
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
    notesService.setStorageStrategy(ENotesStrategy.LocalStorage);
  });

  it('should set the strategy to LocalStorageStrategy if the strategy is LocalStorage', () => {
    const result = notesService.getStorageStrategy();

    expect(result).toEqual(localStorageStrategy);
  });

  it('should call strategy.load() when notesService.fetchAll() is called', () => {
    const spy = localStorageStrategy.load as jasmine.Spy;

    notesService.fetchAll();

    expect(spy.calls.any()).toBeTruthy();
  });

  it('should call strategy.update(payload) when updateOne(payload) is called', () => {
    const spy = localStorageStrategy.update as jasmine.Spy;
    const mockNotePayload: Update<INote> = {
      id: '1',
      changes: {
        title: 'Test Title',
      },
    };

    notesService.updateOne(mockNotePayload);

    expect(spy).toHaveBeenCalledWith(mockNotePayload);
  });

  it('should call strategy.create(note) when addOne(note) is called', () => {
    const spy = localStorageStrategy.create as jasmine.Spy;
    const mockNote: INote = {
      id: '1',
      dateCreated: 1590045443713,
      htmlText: '<h1>Hello</h1>',
      markdownText: '## Test',
      title: 'Testing Note',
    };

    notesService.addOne(mockNote);

    expect(spy).toHaveBeenCalledWith(mockNote);
  });

  it('should call strategy.delete(id) when deleteOne(id) is called', () => {
    const spy = localStorageStrategy.delete as jasmine.Spy;
    const mockId = '1';

    notesService.deleteOne(mockId);

    expect(spy).toHaveBeenCalledWith(mockId);
  });
});
