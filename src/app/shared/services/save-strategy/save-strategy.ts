import { Observable } from 'rxjs';

import { INote } from '../store/markdown-state.model';

export abstract class DataManagementStrategy {
  abstract save(payload: INote[]): Observable<any>;
  abstract load(): Observable<any>;
  abstract delete(): Observable<any>;
  abstract update(payload: Partial<INote>): Observable<any>;
}
