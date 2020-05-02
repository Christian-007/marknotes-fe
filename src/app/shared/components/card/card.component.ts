import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '@app/shared/models/markdown-state.model';
import { NotesActions } from '@app/shared/store/actions';
import { NavigationsActions } from '@app/shared/store/actions';
import * as fromRoot from '@app/shared/store/reducers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  notes$: Observable<INote[]>;
  loading$: Observable<boolean>;
  activeNoteId$: Observable<string>;
  buttonStyles: {};

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.buttonStyles = {
      padding: 0,
    };

    this.notes$ = store.pipe(select(fromRoot.selectAllNotes));
    this.loading$ = store.pipe(select(fromRoot.selectNotesPending));
    this.activeNoteId$ = store.pipe(select(fromRoot.selectActiveNoteId));
  }

  ngOnInit() {
    this.store.dispatch(NotesActions.getNotes());
  }

  onClickAddNote(): void {
    this.store.dispatch(NotesActions.addNote());
  }

  onClickNoteList(noteId: string): void {
    this.store.dispatch(NavigationsActions.clickNote({ payload: noteId }));
  }
}
