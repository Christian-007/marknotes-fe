import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { NotesService } from '../../notes.service';
import {
  NotesActions,
  NavigationsActions,
} from 'src/app/pages/notes/shared/actions';
import * as fromRoot from '../reducers';
import { MarkdownParser } from 'src/app/shared/services/markdown-parser/markdown-parser';
import { INote } from 'src/app/shared/services/store/markdown-state.model';

@Injectable()
export class NotesEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService,
    private store: Store<fromRoot.ApplicationState>,
    private markdownParser: MarkdownParser,
  ) {}

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

  togglePreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationsActions.togglePreview),
      withLatestFrom(
        this.store.pipe(select(fromRoot.selectIsPreviewAndActiveNote)),
        (action, state) => ({ action, state }),
      ),
      switchMap(({ state }) => {
        const { isPreview, activeNote } = state;
        const { id, markdownText } = activeNote;

        if (isPreview) {
          const htmlText = this.markdownParser.convert(markdownText);
          const payload: Update<INote> = {
            id,
            changes: { htmlText },
          };
          return of(NavigationsActions.previewNote({ payload }));
        }
        return EMPTY;
      }),
    ),
  );
}
