import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '@app/presentation/shared/models/markdown-state.model';
import * as fromRoot from '@app/redux/reducers';
import { NotesActions } from '@app/redux/actions';
import { NotesSelector } from '@app/redux/selectors';

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
