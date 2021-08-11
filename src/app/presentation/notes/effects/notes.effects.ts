import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { of, EMPTY } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromRoot from '../reducers';

import {
  NotesActions,
  NavigationsActions,
  NoteDetailActions,
} from '@app/presentation/notes/actions';
import { NotesSelector } from '@app/presentation/notes/selectors';
import { INote } from '@app/shared/models/markdown-state.model';
import { NotesService } from '@app/core/repositories/notes/notes.service';
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

  fetchOneNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteDetailActions.fetchOneNote),
      switchMap(actions => {
        const { noteId } = actions;
        return this.notesService.fetchOne(noteId).pipe(
          map((note: INote) => {
            return NoteDetailActions.fetchOneNoteSuccess({ payload: note });
          }),
        );
      }),
    ),
  );

  updateOneNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteDetailActions.updateOneNote),
      switchMap(actions => {
        const payload: Update<INote> = {
          id: actions.payload.id,
          changes: actions.payload,
        };
        return this.notesService
          .updateOne(payload)
          .pipe(map(() => NoteDetailActions.updateOneNoteSuccess({ payload })));
      }),
    ),
  );

  saveOneNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.saveOneNote),
      withLatestFrom(this.store.pipe(select(fromRoot.selectActiveNoteId))),
      switchMap(([action, activeNoteId]) => {
        const payload: Update<INote> = {
          id: activeNoteId,
          changes: action.payload,
        };

        return this.notesService.updateOne(payload).pipe(
          map(() => NotesActions.saveOneNoteSuccess()),
          catchError(() => EMPTY),
        );
      }),
    ),
  );

  addOneNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addOneNote),
      switchMap(() => {
        const defaultNote = NoteUtil.createDefault();
        return this.notesService
          .addOne(defaultNote)
          .pipe(
            map(() => NotesActions.addOneNoteSuccess({ payload: defaultNote })),
          );
      }),
    ),
  );

  deleteOneNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteOneNote),
      switchMap(actions => {
        const { noteId, componentId } = actions;
        return this.notesService.deleteOne(noteId).pipe(
          map(() => {
            this.componentCreator.destroy(componentId);
            return NotesActions.deleteOneNoteSuccess({ noteId });
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
      ofType(NotesActions.addOneNoteSuccess, NotesActions.deleteOneNoteSuccess),
      withLatestFrom(this.store.pipe(select(NotesSelector.selectAllNotes))),
      switchMap(([_, notes]) => {
        const hasNotes = notes.length > 0;

        if (hasNotes) {
          const firstNoteId = notes[0].id;
          return of(NavigationsActions.clickNote({ payload: firstNoteId }));
        }

        return EMPTY;
      }),
    ),
  );

  togglePreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NavigationsActions.togglePreview,
        NoteDetailActions.fetchOneNoteSuccess,
      ),
      withLatestFrom(
        this.store.pipe(select(fromRoot.selectIsPreviewAndActiveNote)),
      ),
      switchMap(([_, state]) => {
        const { isPreview, activeNote } = state;

        if (isPreview) {
          const payload = this.transformMarkdownToHtml(activeNote);
          return of(NavigationsActions.previewNote({ payload }));
        }

        return EMPTY;
      }),
    ),
  );

  private transformMarkdownToHtml(activeNote: INote): Update<INote> {
    const combinedTitleWithBody = TransformationUtil.combineTitleWithBody(
      activeNote,
    );
    const htmlText = this.markdownParser.convert(combinedTitleWithBody);

    return {
      id: activeNote.id,
      changes: { htmlText },
    };
  }
}
