import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromRoot from '@app/shared/store/reducers';
import { NavigationsActions, NotesActions } from '@app/shared/store/actions';
import { NotesSelector } from '@app/shared/store/selectors';
import { INote } from '@app/shared/models/markdown-state.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
})
export class NotesComponent implements OnInit, OnDestroy {
  isPreview$: Observable<boolean>;
  latestNote$: Observable<INote>;

  private subscription: Subscription;

  constructor(
    private store: Store<fromRoot.ApplicationState>,
    private location: Location,
  ) {
    this.isPreview$ = this.store.pipe(select(fromRoot.selectIsPreview));
    this.latestNote$ = this.store.pipe(
      select(NotesSelector.selectOneLatestNote),
    );
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.store.dispatch(NotesActions.fetchAllNotes());
    this.subscribeToOneLatestNoteSelector();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscribeToOneLatestNoteSelector(): void {
    this.subscription.add(
      this.latestNote$
        .pipe(filter((latestNote: INote) => !!latestNote))
        .subscribe({
          next: (latestNote: INote) => {
            this.redirectToNoteDetailIfInNotesPath(latestNote);
          },
        }),
    );
  }

  private redirectToNoteDetailIfInNotesPath(latestNote: INote): void {
    const notesPath = '/notes';
    const currentPath = this.location.path();
    const isInNotesPath = currentPath === notesPath;

    if (isInNotesPath) {
      this.store.dispatch(
        NavigationsActions.clickNote({ payload: latestNote.id }),
      );
      return;
    }
  }
}
