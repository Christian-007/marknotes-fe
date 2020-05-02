import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { INote } from '@app/shared/models/markdown-state.model';
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
    return this.storageStrategy.load();
  }

  createNote(defaultNote: INote): Observable<any> {
    return this.storageStrategy.create(defaultNote);
  }
}
