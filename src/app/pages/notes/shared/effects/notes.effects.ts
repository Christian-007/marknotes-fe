import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { NotesService } from '../../notes.service';
import { NotesActions } from 'src/app/pages/notes/shared/actions';

@Injectable()
export class NotesEffects {
  constructor(private actions$: Actions, private notesService: NotesService) {}

  getNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.getNotes),
      switchMap(() =>
        this.notesService.getNotes().pipe(
          map(notes => NotesActions.getNotesSuccess({ payload: notes })),
          catchError(() => of(NotesActions.getNotesError)),
        ),
      ),
    ),
  );
}
