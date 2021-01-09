import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Update } from '@ngrx/entity';

import { LocalStorageStrategy } from '@app/shared/services/storage-strategy/local-storage-strategy';
import { StorageStrategy } from '@app/shared/services/storage-strategy/storage-strategy';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';
import { INote } from '@app/shared/models/markdown-state.model';
import { LOCAL_STORAGE } from '@app/shared/constants/storage-name.const';

describe('LocalStorageStrategy', () => {
  let localStorageStrategy: StorageStrategy;
  let mockNote: INote;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageStrategy],
    });

    localStorageStrategy = TestBed.inject(LocalStorageStrategy);
    mockNote = {
      id: '1',
      dateCreated: 1590045443715,
      htmlText: '',
      markdownText: '## Some Markdown',
      title: 'Test Title',
    };
  });

  it('should create', () => {
    expect(localStorageStrategy).toBeTruthy();
  });

  it('should return LocalStorage Enum, when get name', () => {
    expect(localStorageStrategy.name).toBe(EStorageStrategy.LocalStorage);
  });

  it('should return array of notes, when load, and storage has some notes', () => {
    const mockNotesData: INote[] = [mockNote];
    const expected$ = cold('c', { c: mockNotesData });

    const spy = spyOn(localStorage, 'getItem');
    spy.and.callFake(() => JSON.stringify(mockNotesData));

    expect(localStorageStrategy.load()).toBeObservable(expected$);
  });

  it('should return an empty array, when load, and storage has NO notes', () => {
    const mockStorageData = [];
    const expected$ = cold('c', { c: mockStorageData });

    const spy = spyOn(localStorage, 'getItem');
    spy.and.callFake(() => null);

    expect(localStorageStrategy.load()).toBeObservable(expected$);
  });

  it('should call localStorage.getItem, when load', () => {
    const spy = spyOn(localStorage, 'getItem');
    spy.and.callFake(() => null);

    localStorageStrategy.load().subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should return Error with messages, when load, and JSON.parse throws errors', () => {
    // Mock so that it will go through branch with JSON.parse
    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake(() => JSON.stringify([]));

    const mockErrorMessage = 'Error JSON.parsing some data';

    const jsonSpy = spyOn(JSON, 'parse');
    jsonSpy.and.throwError(mockErrorMessage);

    localStorageStrategy.load().subscribe(
      () => {},
      error => {
        expect(error.message).toBe(mockErrorMessage);
      },
    );
  });

  it('should call localStorage.setItem, with new note only, when create, with no loaded notes', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    setItemSpy.and.callFake(() => {});

    const mockNotesData: INote[] = [];

    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake(() => JSON.stringify(mockNotesData));

    const expectedArgs = [LOCAL_STORAGE.notesData, JSON.stringify([mockNote])];

    localStorageStrategy.create(mockNote).subscribe(() => {
      expect(setItemSpy).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  it('should call localStorage.setItem, with appended notes, when create, with some loaded notes', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    setItemSpy.and.callFake(() => {});

    const mockLoadedNotes: INote[] = [
      {
        id: '0',
        dateCreated: 1590045443712,
        htmlText: '',
        markdownText: '## Loaded notes',
        title: 'Loaded Test Title',
      },
    ];

    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake(() => JSON.stringify(mockLoadedNotes));

    const appendNotes = [...mockLoadedNotes, mockNote];
    const expectedArgs = [LOCAL_STORAGE.notesData, JSON.stringify(appendNotes)];

    localStorageStrategy.create(mockNote).subscribe(() => {
      expect(setItemSpy).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  it('should throw errors, when create, if localStorage is full', () => {
    const mockErrorMessage = 'LocalStorage is full!';
    const setItemSpy = spyOn(localStorage, 'setItem');
    setItemSpy.and.throwError(mockErrorMessage);

    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake(() => null);

    localStorageStrategy.create(mockNote).subscribe(
      () => {},
      error => {
        expect(error.message).toBe(mockErrorMessage);
      },
    );
  });

  it('should call localStorage.setItem, with modified note lists, when delete success', () => {
    const mockDeleteId = '1';
    const mockNotesData: INote[] = [mockNote];

    const setItemSpy = spyOn(localStorage, 'setItem');
    setItemSpy.and.callFake(() => {});

    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake(() => JSON.stringify(mockNotesData));

    const expectedArgs = [LOCAL_STORAGE.notesData, JSON.stringify([])];

    localStorageStrategy.delete(mockDeleteId).subscribe(() => {
      expect(setItemSpy).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  it('should throw errors, when delete, if note list is already empty', () => {
    const mockDeleteId = '1';
    const setItemSpy = spyOn(localStorage, 'setItem');
    setItemSpy.and.callFake(() => {});

    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake(() => null);

    localStorageStrategy.delete(mockDeleteId).subscribe(
      () => {},
      error => {
        expect(error.message).toBe(
          'Unable to perform delete when there is no data!',
        );
      },
    );
  });

  it('should call localStorage.setItem, with updated note lists, when update success', () => {
    const mockTitleChange = 'This is an updated title';
    const mockUpdateNoteData: Update<INote> = {
      id: '1',
      changes: {
        title: mockTitleChange,
      },
    };
    const mockNotesData: INote[] = [
      mockNote,
      {
        id: '2',
        dateCreated: 1590045443719,
        htmlText: '',
        markdownText: '## Some Note 2 Markdown',
        title: 'Note no. 2',
      },
    ];

    const setItemSpy = spyOn(localStorage, 'setItem');
    setItemSpy.and.callFake(() => {});

    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake(() => JSON.stringify(mockNotesData));

    const expectedUpdatedNoteList: INote[] = [
      {
        id: '1',
        dateCreated: 1590045443715,
        htmlText: '',
        markdownText: '## Some Markdown',
        title: mockTitleChange,
      },
      {
        id: '2',
        dateCreated: 1590045443719,
        htmlText: '',
        markdownText: '## Some Note 2 Markdown',
        title: 'Note no. 2',
      },
    ];
    const expectedArgs = [
      LOCAL_STORAGE.notesData,
      JSON.stringify(expectedUpdatedNoteList),
    ];

    localStorageStrategy.update(mockUpdateNoteData).subscribe(() => {
      expect(setItemSpy).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  it('should throw errors, when update, if note list is already empty', () => {
    const mockUpdateNoteData: Update<INote> = {
      id: '1',
      changes: {
        title: 'Some changed title',
      },
    };
    const setItemSpy = spyOn(localStorage, 'setItem');
    setItemSpy.and.callFake(() => {});

    const getItemSpy = spyOn(localStorage, 'getItem');
    getItemSpy.and.callFake(() => null);

    localStorageStrategy.update(mockUpdateNoteData).subscribe(
      () => {},
      error => {
        expect(error.message).toBe(
          'Unable to perform update when there is no data!',
        );
      },
    );
  });
});
