import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { MarkdownParser } from 'src/app/shared/services/markdown-parser/markdown-parser';
import { MarkdownState } from 'src/app/shared/services/store/markdown-state.model';
import { MarkdownStore } from 'src/app/shared/services/store/markdown.store';
import { Toolbar } from 'src/app/shared/enums/toolbars.enum';
import * as data from './note-dummy.json';

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
  Toolbar: typeof Toolbar;

  constructor(
    private markdownParser: MarkdownParser,
    private markdownStore: MarkdownStore,
  ) {
    this.Toolbar = Toolbar;
  }

  ngOnInit() {
    this.markdownStore.state$.subscribe((state: MarkdownState) => {
      this.markdownText = state.markdownText;
      this.htmlText = state.htmlText;
      this.isChecked = state.checked;
    });

    this.markdownStore.setMarkdownText(data.content);
    this.convertMarkdown();
  }

  convertMarkdown(): void {
    this.htmlText = this.markdownParser.convert(this.markdownText);
  }

  onMarkdownChange(): void {
    this.markdownStore.setMarkdownText(this.markdownText);
  }
}
