import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { MarkdownParser } from 'src/app/shared/services/markdown-parser/markdown-parser';
import { MarkdownState } from 'src/app/shared/services/store/markdown-state.model';
import { MarkdownStore } from 'src/app/shared/services/store/markdown.store';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteDetailsComponent implements OnInit {
  markdownText: string;
  htmlText: SafeHtml;

  constructor(
    private markdownParser: MarkdownParser,
    private markdownStore: MarkdownStore<MarkdownState>,
  ) {}

  ngOnInit() {
    this.markdownStore.state$.subscribe((state: MarkdownState) => {
      this.markdownText = state.markdownText;
      this.htmlText = state.htmlText;
    });

    this.markdownStore.setMarkdownText(
      (this.markdownText =
        '### Initialize in JavaScript\nYou can provide more options by initializing the provider in JavaScript.\n```ts\nimport { Providers } from "@providers/provider";\n\nexport class Encryptor {\n  encryptionMethod: string; \n}\n```\nYou must provide a `clientId` (to create a new `UserAgentApplication`).'),
    );
  }

  convertMarkdown(): void {
    this.htmlText = this.markdownParser.convert(this.markdownText);
  }

  onMarkdownChange(): void {
    this.markdownStore.setMarkdownText(this.markdownText);
  }
}
