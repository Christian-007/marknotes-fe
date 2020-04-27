import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { INote } from 'src/app/shared/services/store/markdown-state.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  getNotes(): Observable<INote[]> {
    const notes = [
      {
        id: '1',
        title: 'Untitled Document',
        dateCreated: Date.now(),
        htmlText: '<p>Hello this is 1</p>',
        markdownText: '',
      },
      {
        id: '2',
        title: '@ngrx/store tutorial',
        dateCreated: Date.now(),
        htmlText: '<p>Hello this is 2</p>',
        markdownText: '',
      },
    ];

    return of(notes).pipe(delay(2000));
  }
}
