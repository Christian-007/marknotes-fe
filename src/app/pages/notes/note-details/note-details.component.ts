import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import { MarkdownParser } from 'src/app/shared/services/markdown-parser/markdown-parser';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteDetailsComponent implements OnInit {
  markdownText: string;
  htmlText: SafeHtml;

  constructor(private markdownParser: MarkdownParser) {
    this.markdownText =
      '### Initialize in JavaScript\nYou can provide more options by initializing the provider in JavaScript.\n```ts\nimport { Providers } from "@providers/provider";\n\nexport class Encryptor {\n  encryptionMethod: string; \n}\n```\nYou must provide a `clientId` (to create a new `UserAgentApplication`).';
  }

  ngOnInit() {
    this.convertMarkdown();
  }

  convertMarkdown(): void {
    this.htmlText = this.markdownParser.convert(this.markdownText);
  }
}
