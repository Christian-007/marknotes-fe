import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { NavigationsActions, NotesActions } from '../actions';
import * as fromRoot from '../reducers';

import { NotesService } from '@app/pages/notes/notes.service';

@Injectable()
export class NavigationsEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService,
    private router: Router,
    private store: Store<fromRoot.ApplicationState>,
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

  navigateToNotes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotesActions.deleteOneNoteSuccess),
        withLatestFrom(this.store.pipe(select(fromRoot.hasNotesInStorage))),
        tap(([_, hasNotesInStorage]) => {
          if (!hasNotesInStorage) {
            return this.router.navigate(['/notes']);
          }

          return EMPTY;
        }),
      ),
    { dispatch: false },
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
