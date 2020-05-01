import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DataManagementStrategy } from './save-strategy';
import { LOCAL_STORAGE } from '../../constants/storage-name.const';
import { INote } from '../store/markdown-state.model';

export class LocalStorageStrategy extends DataManagementStrategy {
  save(payload: INote[]): Observable<any> {
    const saveObs = new Observable(observer => {
      try {
        localStorage.setItem(LOCAL_STORAGE.notesData, JSON.stringify(payload));
        observer.next();
      } catch (error) {
        observer.error(error);
      }
    });
    return saveObs;
  }

  load(): Observable<INote[]> {
    const loadObs = new Observable<INote[]>(observer => {
      try {
        const data = localStorage.getItem(LOCAL_STORAGE.notesData);
        observer.next(JSON.parse(data));
      } catch (error) {
        observer.error(error);
      }
    });
    return loadObs;
  }

  delete(): Observable<any> {
    const deleteObs = new Observable(observer => {
      try {
        localStorage.removeItem(LOCAL_STORAGE.notesData);
        observer.next();
      } catch (error) {
        observer.error(error);
      }
    });
    return deleteObs;
  }

  update(payload: Partial<INote>): Observable<any> {
    return this.load().pipe(
      switchMap((loadedNotes: INote[]) => {
        if (loadedNotes.length > 0) {
          const updatedNotes = this.getUpdatedData(loadedNotes, payload);
          return this.save(updatedNotes);
        }
        throwError(null);
      }),
    );
  }

  private getUpdatedData(
    loadedNotes: INote[],
    payload: Partial<INote>,
  ): INote[] {
    return loadedNotes.map(note => {
      if (note.id === payload.id) {
        return {
          ...note,
          ...payload,
        };
      }
      return note;
    });
  }
}
