import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { INote } from '@app/shared/models/markdown-state.model';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';

export abstract class StorageStrategy {
  abstract get name(): EStorageStrategy;
  abstract create(payload: INote): Observable<any>;
  abstract load(): Observable<any>;
  abstract delete(): Observable<any>;
  abstract update(payload: Update<INote>): Observable<any>;
}
