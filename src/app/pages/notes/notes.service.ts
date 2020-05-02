import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { INote } from '@app/shared/services/store/markdown-state.model';
import { generateRandomId } from '@app/shared/utils/generator.util';
import { StorageStrategy } from '@app/shared/services/storage-strategy/storage-strategy';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';

@Injectable()
export class NotesService {
  private storageStrategy: StorageStrategy;

  constructor(private strategies: StorageStrategy[]) {}

  setStorageStrategy(strategyName: EStorageStrategy): void {
    this.storageStrategy = this.strategies.find(
      (strategy: StorageStrategy) => strategyName === strategy.name,
    );
  }

  getNotes(): Observable<INote[]> {
    const notes = [
      {
        id: '1',
        title: 'Untitled Document',
        dateCreated: Date.now() + 1,
        htmlText: '<p>Hello this is 1</p>',
        markdownText: '',
      },
      {
        id: '2',
        title: '@ngrx/store tutorial',
        dateCreated: Date.now() + 2,
        htmlText: '<p>Hello this is 2</p>',
        markdownText: '',
      },
    ];

    return of(notes).pipe(delay(2000));
  }

  createNote(defaultNote: INote): Observable<any> {
    return this.storageStrategy.create(defaultNote);
  }
}
