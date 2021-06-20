import {
  Component,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '@app/redux/reducers';
import { NavigationsActions, NotesActions } from '@app/redux/actions';
import { NotesSelector } from '@app/redux/selectors';
import { INote } from '@app/presentation/shared/models/markdown-state.model';

@Component({
  selector: 'app-mobile-note-list',
  templateUrl: './mobile-note-list.component.html',
  styleUrls: ['../mobile-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MobileNoteListComponent {
  notes$: Observable<INote[]>;
  loading$: Observable<boolean>;
  activeNoteId$: Observable<string>;
  hasNotesInStorage$: Observable<boolean>;
  noteListButtonStyles: {};
  addButtonStyles: {};
  @Output() clickNoteList: EventEmitter<any>;

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.noteListButtonStyles = {
      'border-radius': 0,
      'text-align': 'left',
      padding: 0,
    };
    this.addButtonStyles = {
      'background-color': '#f2f2f2',
      color: '#000',
      'text-align': 'center',
      'border-radius': '2px',
      'font-size': '0.8rem',
      'justify-content': 'center',
    };
    this.notes$ = store.pipe(select(NotesSelector.selectAllNotes));
    this.loading$ = store.pipe(select(NotesSelector.selectNotesPending));
    this.activeNoteId$ = store.pipe(select(fromRoot.selectActiveNoteId));
    this.hasNotesInStorage$ = store.pipe(select(fromRoot.hasNotesInStorage));
    this.clickNoteList = new EventEmitter();
  }

  addNote(): void {
    this.store.dispatch(NotesActions.addOneNote());
  }

  onClickNoteList(noteId: string): void {
    this.store.dispatch(NavigationsActions.clickNote({ payload: noteId }));
    this.clickNoteList.emit();
  }
}
