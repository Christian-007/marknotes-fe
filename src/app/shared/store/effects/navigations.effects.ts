import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';

import { NavigationsActions } from '../actions';

import { NotesService } from '@app/pages/notes/notes.service';

@Injectable()
export class NavigationsEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService,
    private router: Router,
  ) {}

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

  navigateToNoteDetail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NavigationsActions.clickNote),
        tap(actions => {
          const { payload } = actions;
          return this.router.navigate(['/notes', payload]);
        }),
      ),
    { dispatch: false },
  );
}
