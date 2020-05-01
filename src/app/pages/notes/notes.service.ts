import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { INote } from 'src/app/shared/services/store/markdown-state.model';
import { generateRandomId } from 'src/app/shared/utils/generator.util';

@Injectable({ providedIn: 'root' })
export class NotesService {
  getNotes(): Observable<INote[]> {
    const notes = [
      {
        id: '1',
        title: 'Untitled Document',
        dateCreated: Date.now() + 1,
        htmlText: '<p>Hello this is 1</p>',
        markdownText: '',
      },
      {
        id: '2',
        title: '@ngrx/store tutorial',
        dateCreated: Date.now() + 2,
        htmlText: '<p>Hello this is 2</p>',
        markdownText: '',
      },
    ];

    return of(notes).pipe(delay(2000));
  }

  createNote(): Observable<INote> {
    const defaultNote: INote = {
      id: generateRandomId(),
      title: 'Untitled Document',
      dateCreated: Date.now(),
      htmlText: '',
      markdownText: '',
    };

    return of(defaultNote);
  }
}
