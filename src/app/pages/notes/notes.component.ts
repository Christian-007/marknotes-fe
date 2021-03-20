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
  template: `
    <div class="flex flex-col w-full h-full">
      <app-topbar></app-topbar>
      <div class="flex flex-row w-full h-full overflow-hidden">
        <div class="w-1/4 xl:w-1/5 h-full pl-6 pr-4 py-4 overflow-auto">
          <app-sidebar></app-sidebar>
        </div>
        <div
          class="w-3/4 xl:w-4/5 h-full pr-6 pl-4 py-4 overflow-auto"
          [ngClass]="{ 'bg-gray-100': (isPreview$ | async) === false }"
        >
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
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
