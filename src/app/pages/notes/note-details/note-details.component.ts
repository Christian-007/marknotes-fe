import { Component, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from 'src/app/shared/services/store/markdown-state.model';
import * as fromRoot from 'src/app/pages/notes/shared/reducers';
import { NotesActions } from '../shared/actions';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteDetailsComponent {
  note: INote;
  isPreview$: Observable<boolean>;

  constructor(private store: Store<fromRoot.ApplicationState>) {
    const note$ = store.pipe(select(fromRoot.selectActiveNote));
    note$.subscribe((noteValue: INote) => {
      this.note = noteValue;
    });
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
  }

  onMarkdownChange(): void {
    const { id, markdownText } = this.note;
    const update = {
      payload: { id, changes: { markdownText } },
    };
    this.store.dispatch(NotesActions.writeNote(update));
  }
}
