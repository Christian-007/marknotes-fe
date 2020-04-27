import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '../../services/store/markdown-state.model';
import { NotesActions } from 'src/app/pages/notes/shared/actions';
import { NavigationsActions } from 'src/app/pages/notes/shared/actions';
import * as fromRoot from 'src/app/pages/notes/shared/reducers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  notes$: Observable<INote[]>;
  loading$: Observable<boolean>;
  activeNoteId$: Observable<number>;
  buttonStyles: {};

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.buttonStyles = {
      'padding-right': 0,
    };

    this.notes$ = store.pipe(select(fromRoot.selectAllNotes));
    this.loading$ = store.pipe(select(fromRoot.selectNotesPending));
    this.activeNoteId$ = store.pipe(select(fromRoot.selectActiveNoteId));
  }

  ngOnInit() {
    this.store.dispatch(NotesActions.getNotes());
  }

  onClickAddNote(): void {
    console.log('hello on add');
  }

  onClickNoteList(noteId: number): void {
    this.store.dispatch(NavigationsActions.clickNote({ payload: noteId }));
  }
}
