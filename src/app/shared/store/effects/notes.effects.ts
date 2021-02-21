import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { of, EMPTY } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromRoot from '../reducers';

import { NotesActions, NavigationsActions } from '@app/shared/store/actions';
import { INote } from '@app/shared/models/markdown-state.model';
import { NotesService } from '@app/pages/notes/notes.service';
import { MarkdownParser } from '@app/shared/services/markdown-parser/markdown-parser';
import { ComponentCreator } from '@app/shared/services/component-creator/component-creator';
import { NoteUtil } from '@app/shared/utils/note.util';
import { TransformationUtil } from '@app/shared/utils/transformation.util';

@Injectable()
export class NotesEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService,
    private store: Store<fromRoot.ApplicationState>,
    private markdownParser: MarkdownParser,
    private componentCreator: ComponentCreator,
  ) {}

  fetchAllNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.fetchAllNotes),
      switchMap(() =>
        this.notesService.fetchAll().pipe(
          map(notes => {
            return NotesActions.fetchAllNotesSuccess({ payload: notes });
          }),
          catchError(() => of(NotesActions.fetchAllNotesError())),
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

  saveNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.saveNote),
      withLatestFrom(this.store.pipe(select(fromRoot.selectActiveNoteId))),
      switchMap(([action, activeNoteId]) => {
        const payload: Update<INote> = {
          id: activeNoteId,
          changes: action.payload,
        };

        return this.notesService.updateNote(payload).pipe(
          map(() => NotesActions.saveNoteSuccess()),
          catchError(() => EMPTY),
        );
      }),
    ),
  );

  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNote),
      switchMap(() => {
        const defaultNote = NoteUtil.createDefault();
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
          map(() => {
            this.componentCreator.destroy(componentId);
            return NotesActions.deleteNoteSuccess({ noteId });
          }),
          catchError(() => {
            this.componentCreator.destroy(componentId);
            return EMPTY;
          }),
        );
      }),
    ),
  );

  setActiveNoteId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotesActions.fetchAllNotesSuccess,
        NotesActions.addNoteSuccess,
        NotesActions.deleteNoteSuccess,
      ),
      withLatestFrom(this.store.pipe(select(fromRoot.selectAllNotes))),
      switchMap(([action, notes]) => {
        if (notes.length > 0) {
          const firstNoteId = notes[0].id;
          return of(NavigationsActions.clickNote({ payload: firstNoteId }));
        }
        return EMPTY;
      }),
    ),
  );

  togglePreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationsActions.togglePreview, NavigationsActions.clickNote),
      withLatestFrom(
        this.store.pipe(select(fromRoot.selectIsPreviewAndActiveNote)),
      ),
      switchMap(([action, state]) => {
        const { isPreview, activeNote } = state;

        if (isPreview) {
          const combinedTitleWithBody = TransformationUtil.combineTitleWithBody(
            activeNote,
          );
          const htmlText = this.markdownParser.convert(combinedTitleWithBody);
          const payload: Update<INote> = {
            id: activeNote.id,
            changes: { htmlText },
          };
          return of(NavigationsActions.previewNote({ payload }));
        }
        return EMPTY;
      }),
    ),
  );
}
