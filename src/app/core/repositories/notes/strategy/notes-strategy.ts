import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { INote } from '@app/shared/models/markdown-state.model';
import { ENotesStrategy } from '@app/shared/enums/notes-strategy.enum';

export abstract class NotesStrategy {
  abstract get name(): ENotesStrategy;
  abstract create(payload: INote): Observable<any>;
  abstract findOne(id: string): Observable<any>;
  abstract load(): Observable<any>;
  abstract delete(id: string): Observable<any>;
  abstract update(payload: Update<INote>): Observable<any>;
}
