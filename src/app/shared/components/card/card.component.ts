import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '@app/shared/models/markdown-state.model';
import { NotesActions } from '@app/shared/store/actions';
import * as fromRoot from '@app/shared/store/reducers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  notes$: Observable<INote[]>;
  loading$: Observable<boolean>;
  hasNotesInStorage$: Observable<boolean>;
  buttonStyles: {};

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.buttonStyles = {
      padding: 0,
    };
    this.notes$ = store.pipe(select(fromRoot.selectAllNotes));
    this.loading$ = store.pipe(select(fromRoot.selectNotesPending));
    this.hasNotesInStorage$ = store.pipe(select(fromRoot.hasNotesInStorage));
  }

  ngOnInit(): void {
    this.store.dispatch(NotesActions.fetchAllNotes());
  }

  onClickAddNote(): void {
    this.store.dispatch(NotesActions.addOneNote());
  }
}
