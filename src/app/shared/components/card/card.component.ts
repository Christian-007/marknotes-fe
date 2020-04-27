import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '../../services/store/markdown-state.model';
import { NotesActions } from 'src/app/pages/notes/shared/actions';
import * as fromNotes from 'src/app/pages/notes/shared/reducers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  notes$: Observable<INote[]>;
  loading$: Observable<boolean>;
  currentActiveNote: INote;
  buttonStyles: {};

  constructor(private store: Store<fromNotes.ApplicationState>) {
    this.buttonStyles = {
      'padding-right': 0,
    };

    const dummyNote = {
      id: '1',
      title: 'Untiteld Documnet',
      dateCreated: Date.now(),
      htmlText: '',
      markdownText: '',
    };
    this.notes$ = store.pipe(select(fromNotes.selectAllNotes));
    this.loading$ = store.pipe(select(fromNotes.selectNotesPending));
    this.currentActiveNote = dummyNote;
  }

  ngOnInit() {
    this.store.dispatch(NotesActions.getNotes());
  }

  onClickAddNote(): void {
    console.log('hello on add');
  }

  onClickNoteList(docId: string): void {
    console.log('Document Click: ', docId);
    // this.currentActiveNoteId = docId;
  }
}
