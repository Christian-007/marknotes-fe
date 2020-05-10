import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { NotesService } from '@app/pages/notes/notes.service';
import { NotesActions, NavigationsActions } from '@app/shared/store/actions';
import * as fromRoot from '../reducers';
import { MarkdownParser } from '@app/shared/services/markdown-parser/markdown-parser';
import { INote } from '@app/shared/models/markdown-state.model';
import { createDefaultNote } from '@app/shared/constants/note.const';

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
          map(notes => {
            return NotesActions.getNotesSuccess({ payload: notes });
          }),
          catchError(() => of(NotesActions.getNotesError)),
        ),
      ),
    ),
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNote),
      withLatestFrom(this.store.pipe(select(fromRoot.selectActiveNoteId))),
      switchMap(([action, activeNoteId]) => {
        const payload: Update<INote> = {
          id: activeNoteId,
          changes: action.payload,
        };
        return this.notesService
          .updateNote(payload)
          .pipe(map(() => NotesActions.updateNoteSuccess({ payload })));
      }),
    ),
  );

  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNote),
      switchMap(() => {
        const defaultNote = createDefaultNote();
        return this.notesService
          .createNote(defaultNote)
          .pipe(
            map(() => NotesActions.addNoteSuccess({ payload: defaultNote })),
          );
      }),
    ),
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      switchMap(actions => {
        const { noteId, componentId } = actions;
        return this.notesService.deleteNote(noteId).pipe(
          map(() => NotesActions.deleteNoteSuccess({ noteId, componentId })),
          catchError(() => EMPTY),
        );
      }),
    ),
  );

  setActiveNoteId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotesActions.getNotesSuccess,
        NotesActions.addNoteSuccess,
        NotesActions.deleteNoteSuccess,
      ),
      withLatestFrom(this.store.pipe(select(fromRoot.selectAllNotes))),
      switchMap(([action, orderedNotes]) => {
        if (orderedNotes.length > 0) {
          const firstNoteId = orderedNotes[0].id;
          return of(NavigationsActions.clickNote({ payload: firstNoteId }));
        }
        return EMPTY;
      }),
    ),
  );

  togglePreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationsActions.togglePreview),
      withLatestFrom(
        this.store.pipe(select(fromRoot.selectIsPreviewAndActiveNote)),
      ),
      switchMap(([action, state]) => {
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
