import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '@app/pages/notes/shared/reducers';
import {
  NavigationsActions,
  NotesActions,
} from '@app/pages/notes/shared/actions';
import { INote } from '@app/shared/services/store/markdown-state.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  isPreview$: Observable<boolean>;
  activeNote$: Observable<INote>;
  activeNote: INote;
  subscription: Subscription;

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
    this.activeNote$ = store.pipe(select(fromRoot.selectActiveNote));
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(
      this.activeNote$.subscribe(note => {
        this.activeNote = note;
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickPreview(): void {
    this.store.dispatch(NavigationsActions.togglePreview());
  }

  onSubmitEdit(updatedNoteTitle: string): void {
    const { id } = this.activeNote;
    const update = {
      payload: { id, changes: { title: updatedNoteTitle } },
    };
    this.store.dispatch(NotesActions.updateNote(update));
  }
}
