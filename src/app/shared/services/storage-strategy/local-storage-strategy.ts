import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

import { StorageStrategy } from './storage-strategy';
import { LOCAL_STORAGE } from '@app/shared/constants/storage-name.const';
import { INote } from '@app/shared/models/markdown-state.model';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';

export class LocalStorageStrategy extends StorageStrategy {
  get name(): EStorageStrategy {
    return EStorageStrategy.LocalStorage;
  }

  create(payload: INote): Observable<any> {
    return this.load().pipe(
      switchMap((loadedNotes: INote[]) => {
        if (loadedNotes) {
          const updatedNotes = [...loadedNotes, payload];
          return this.setItem(updatedNotes);
        }
        return this.setItem([payload]);
      }),
    );
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

  // ! Should delete selectively (not delete all)
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

  update(payload: Update<INote>): Observable<any> {
    return this.load().pipe(
      switchMap((loadedNotes: INote[]) => {
        if (loadedNotes.length > 0) {
          const updatedNotes = this.getUpdatedData(loadedNotes, payload);
          return this.setItem(updatedNotes);
        }
        throwError(null);
      }),
    );
  }

  setItem(payload: INote[]): Observable<any> {
    const setObs = new Observable(observer => {
      try {
        localStorage.setItem(LOCAL_STORAGE.notesData, JSON.stringify(payload));
        observer.next();
      } catch (error) {
        observer.error(error);
      }
    });
    return setObs;
  }

  private getUpdatedData(
    loadedNotes: INote[],
    payload: Update<INote>,
  ): INote[] {
    return loadedNotes.map(note => {
      if (note.id === payload.id) {
        return {
          ...note,
          ...payload.changes,
        };
      }
      return note;
    });
  }
}
