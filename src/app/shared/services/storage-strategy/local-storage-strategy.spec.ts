import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Update } from '@ngrx/entity';

import { LocalStorageStrategy } from '@app/shared/services/storage-strategy/local-storage-strategy';
import { StorageStrategy } from '@app/shared/services/storage-strategy/storage-strategy';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';
import { INote } from '@app/shared/models/markdown-state.model';

describe('LocalStorageStrategy', () => {
  let localStorageStrategy: StorageStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageStrategy],
    });

    localStorageStrategy = TestBed.get(LocalStorageStrategy);
  });

  it('should create', () => {
    expect(localStorageStrategy).toBeTruthy();
  });

  it('should return LocalStorage Enum, when get name', () => {
    expect(localStorageStrategy.name).toBe(EStorageStrategy.LocalStorage);
  });

  it('should return array of notes, when load, and storage has some notes', () => {
    const mockNotesData: INote[] = [
      {
        id: '1',
        dateCreated: 1590045443715,
        htmlText: '',
        markdownText: '## Some Markdown',
        title: 'Test Title',
      },
    ];
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
});
