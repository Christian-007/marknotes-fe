import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INote } from '@app/presentation/shared/models/markdown-state.model';
import * as fromRoot from '@app/redux/reducers';
import { NoteDetailSelectors } from '@app/redux/selectors';
import { NoteDetailActions } from '@app/redux/actions';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteDetailComponent implements OnInit {
  activeNote$: Observable<INote>;
  note: INote;
  isPreview$: Observable<boolean>;
  hasNotesInStorage$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.ApplicationState>,
    private route: ActivatedRoute,
  ) {
    this.activeNote$ = store.pipe(select(NoteDetailSelectors.selectOne));
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
    const { id, title } = this.note;
    const update: Partial<INote> = {
      id,
      title,
    };

    this.store.dispatch(NoteDetailActions.updateOneNote({ payload: update }));
  }

  onMarkdownChange(): void {
    const { id, markdownText } = this.note;
    const update: Partial<INote> = {
      id,
      markdownText,
    };

    this.store.dispatch(NoteDetailActions.updateOneNote({ payload: update }));
  }

  private subscribeToRouteParameters(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const noteId = params.get('id');
      this.store.dispatch(NoteDetailActions.fetchOneNote({ noteId }));
    });
  }
}
