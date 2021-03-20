import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '@app/shared/models/markdown-state.model';
import * as fromRoot from '@app/shared/store/reducers';
import { NotesActions } from '@app/shared/store/actions';
import { NotesSelector } from '@app/shared/store/selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  notes$: Observable<INote[]>;
  loading$: Observable<boolean>;
  hasNotesInStorage$: Observable<boolean>;

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.notes$ = store.pipe(select(NotesSelector.selectAllNotes));
    this.loading$ = store.pipe(select(NotesSelector.selectNotesPending));
    this.hasNotesInStorage$ = store.pipe(select(fromRoot.hasNotesInStorage));
  }

  onClickAddNote(): void {
    this.store.dispatch(NotesActions.addOneNote());
  }
}
