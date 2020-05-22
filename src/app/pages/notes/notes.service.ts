import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { INote } from '@app/shared/models/markdown-state.model';
import { StorageStrategy } from '@app/shared/services/storage-strategy/storage-strategy';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';

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

  updateNote(payload: Update<INote>): Observable<any> {
    return this.storageStrategy.update(payload);
  }

  createNote(defaultNote: INote): Observable<any> {
    return this.storageStrategy.create(defaultNote);
  }

  deleteNote(id: string): Observable<any> {
    return this.storageStrategy.delete(id);
  }
}
