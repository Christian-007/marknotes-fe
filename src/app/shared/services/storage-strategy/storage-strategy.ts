import { Observable } from 'rxjs';

import { INote } from '../../models/markdown-state.model';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';

export abstract class StorageStrategy {
  abstract get name(): EStorageStrategy;
  abstract create(payload: INote): Observable<any>;
  abstract load(): Observable<any>;
  abstract delete(): Observable<any>;
  abstract update(payload: Partial<INote>): Observable<any>;
}
