import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MarkdownParser } from 'src/app/shared/services/markdown-parser/markdown-parser';
import { INote } from 'src/app/shared/services/store/markdown-state.model';
import { Toolbar } from 'src/app/shared/enums/toolbars.enum';
import * as fromRoot from 'src/app/pages/notes/shared/reducers';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteDetailsComponent implements OnInit {
  Toolbar: typeof Toolbar;
  note$: Observable<INote>;
  isPreview$: Observable<boolean>;

  constructor(
    private markdownParser: MarkdownParser,
    private store: Store<fromRoot.ApplicationState>,
  ) {
    this.Toolbar = Toolbar;
    this.note$ = store.pipe(select(fromRoot.selectActiveNote));
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
  }

  ngOnInit() {}

  convertMarkdown(): void {
    // this.htmlText = this.markdownParser.convert(this.markdownText);
  }

  onMarkdownChange(): void {
    /* this.markdownStore.updateNote({
      ...this.note,
      markdownText: this.markdownText,
    }); */
  }
}
