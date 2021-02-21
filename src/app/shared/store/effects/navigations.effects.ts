import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { NotesService } from '@app/pages/notes/notes.service';
import { NavigationsActions } from '../actions';

@Injectable()
export class NavigationsEffects {
  constructor(private actions$: Actions, private notesService: NotesService) {}

  submitNoteTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationsActions.submitNoteTitle),
      switchMap(action => {
        const { payload } = action;
        return this.notesService
          .updateOne(payload)
          .pipe(
            map(_ => NavigationsActions.submitNoteTitleSuccess({ payload })),
          );
      }),
    ),
  );
}
