import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  activeNote$: Observable<INote>;
  note: INote;
  isPreview$: Observable<boolean>;
  hasNotesInStorage$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.ApplicationState>,
    private route: ActivatedRoute,
  ) {
    this.activeNote$ = store.pipe(select(fromRoot.selectActiveNote));
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
    this.hasNotesInStorage$ = store.pipe(select(fromRoot.hasNotesInStorage));
  }

  ngOnInit(): void {
    this.subscribeToRouteParameters();
    this.activeNote$.subscribe((noteValue: INote) => {
      this.note = { ...noteValue };
    });
  }

  onNoteTitleChange(): void {
    const { title } = this.note;
    const update: Partial<INote> = {
      title,
    };

    this.store.dispatch(NotesActions.updateOneNote({ payload: update }));
  }

  onMarkdownChange(): void {
    const { markdownText } = this.note;
    const update: Partial<INote> = {
      markdownText,
    };

    this.store.dispatch(NotesActions.updateOneNote({ payload: update }));
  }

  private subscribeToRouteParameters(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const noteId = params.get('id');
      this.store.dispatch(NotesActions.fetchOneNote({ noteId }));
    });
  }
}
