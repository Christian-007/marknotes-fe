import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '../../services/store/markdown-state.model';
import { NotesActions } from 'src/app/pages/notes/shared/actions';
import { NotesReducerState } from 'src/app/pages/notes/shared/reducers/notes.reducer';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  notes$: Observable<NotesReducerState>;
  currentActiveNote: INote;
  buttonStyles: {};

  constructor(private store: Store<{ notes: NotesReducerState }>) {
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
    this.store.dispatch(NotesActions.getNotes());
    this.notes$ = store.pipe(select('notes'));
    this.currentActiveNote = dummyNote;
  }

  ngOnInit() {}

  onClickAddNote(): void {
    console.log('hello on add');
  }

  onClickNoteList(docId: string): void {
    console.log('Document Click: ', docId);
    // this.currentActiveNoteId = docId;
  }
}
