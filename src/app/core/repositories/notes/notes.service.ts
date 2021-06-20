import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { INote } from '@app/presentation/shared/models/markdown-state.model';
import { NotesStrategy } from '@app/core/repositories/notes/strategy/notes-strategy';
import { ENotesStrategy } from '@app/presentation/shared/enums/notes-strategy.enum';

export class NotesService {
  private storageStrategy: NotesStrategy;

  constructor(private strategies: NotesStrategy[]) {}

  setStorageStrategy(strategyName: ENotesStrategy): void {
    this.storageStrategy = this.strategies.find(
      (strategy: NotesStrategy) => strategyName === strategy.name,
    );
  }

  getStorageStrategy(): NotesStrategy {
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
