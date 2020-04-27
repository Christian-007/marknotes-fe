import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MarkdownParser } from 'src/app/shared/services/markdown-parser/markdown-parser';
import {
  MarkdownState,
  INote,
} from 'src/app/shared/services/store/markdown-state.model';
import { MarkdownStore } from 'src/app/shared/services/store/markdown.store';
import { Toolbar } from 'src/app/shared/enums/toolbars.enum';
import * as fromRoot from 'src/app/pages/notes/shared/reducers';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteDetailsComponent implements OnInit {
  markdownText: string;
  htmlText: SafeHtml;
  isChecked: { [key: string]: boolean };
  note: INote;
  Toolbar: typeof Toolbar;
  note$: Observable<INote>;

  constructor(
    private markdownParser: MarkdownParser,
    private markdownStore: MarkdownStore,
    private store: Store<fromRoot.ApplicationState>,
  ) {
    this.Toolbar = Toolbar;
    this.note$ = store.pipe(select(fromRoot.selectActiveNote));
  }

  ngOnInit() {
    this.markdownStore.state$.subscribe((state: MarkdownState) => {
      this.isChecked = state.checked;

      const currentNote = state.notes.find(
        note => note.id === state.currentActiveNote.id,
      );

      if (currentNote) {
        this.markdownText = currentNote.markdownText;
        this.note = currentNote;
        this.convertMarkdown();
      } else {
        this.markdownText = '';
        this.htmlText = '';
      }
    });
  }

  convertMarkdown(): void {
    this.htmlText = this.markdownParser.convert(this.markdownText);
  }

  onMarkdownChange(): void {
    this.markdownStore.updateNote({
      ...this.note,
      markdownText: this.markdownText,
    });
  }
}
