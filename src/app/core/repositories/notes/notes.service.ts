import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { INote } from '@app/presentation/shared/models/markdown-state.model';
import { StorageStrategy } from '@app/presentation/shared/services/storage-strategy/storage-strategy';
import { EStorageStrategy } from '@app/presentation/shared/enums/strategy.enum';

export class NotesService {
  private storageStrategy: StorageStrategy;

  constructor(private strategies: StorageStrategy[]) {}

  setStorageStrategy(strategyName: EStorageStrategy): void {
    this.storageStrategy = this.strategies.find(
      (strategy: StorageStrategy) => strategyName === strategy.name,
    );
  }

  getStorageStrategy(): StorageStrategy {
    return this.storageStrategy;
  }

  fetchAll(): Observable<INote[]> {
    return this.storageStrategy.load();
  }

  fetchOne(id: string): Observable<INote> {
    return this.storageStrategy.findOne(id);
  }

  updateOne(payload: Update<INote>): Observable<any> {
    return this.storageStrategy.update(payload);
  }

  addOne(defaultNote: INote): Observable<any> {
    return this.storageStrategy.create(defaultNote);
  }

  deleteOne(id: string): Observable<any> {
    return this.storageStrategy.delete(id);
  }
}
