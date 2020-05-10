import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '@app/shared/models/markdown-state.model';
import * as fromRoot from '@app/shared/store/reducers';
import { NotesActions } from '@app/shared/store/actions';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteDetailsComponent implements OnInit {
  note$: Observable<INote>;
  note: INote;
  isPreview$: Observable<boolean>;
  hasNotesInStorage$: Observable<boolean>;

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.note$ = store.pipe(select(fromRoot.selectActiveNote));
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
    this.hasNotesInStorage$ = store.pipe(select(fromRoot.hasNotesInStorage));
  }

  ngOnInit() {
    this.note$.subscribe((noteValue: INote) => {
      this.note = noteValue;
    });
  }

  onMarkdownChange(): void {
    const { markdownText } = this.note;
    const update: Partial<INote> = {
      markdownText,
    };
    this.store.dispatch(NotesActions.updateNote({ payload: update }));
  }
}
