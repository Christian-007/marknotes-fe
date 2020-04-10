import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import * as marked from 'marked';
import * as highlightjs from 'highlight.js';
import * as DOMPurify from 'dompurify';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteDetailsComponent implements OnInit {
  markdownText: string;
  htmlText: SafeHtml;
  markdownParser: typeof marked;

  constructor(private sanitizer: DomSanitizer) {
    const renderer = new marked.Renderer();
    renderer.code = this.highlightCode;
    this.markdownParser = marked.setOptions({ renderer });
    this.markdownText =
      '### Initialize in JavaScript\nYou can provide more options by initializing the provider in JavaScript.\n```ts\nimport { Providers } from "@providers/provider";\n\nexport class Encryptor {\n  encryptionMethod: string; \n}\n```\nYou must provide a `clientId` (to create a new `UserAgentApplication`).';
  }

  ngOnInit() {
    this.convertMarkdown();
  }

  convertMarkdown(): void {
    this.htmlText = this.markdownToSafeHtml(this.markdownText);
  }

  markdownToSafeHtml(markdownTexts: string): SafeHtml {
    const html = this.markdownParser(markdownTexts);
    const safeHtml = DOMPurify.sanitize(html);
    return this.sanitizer.bypassSecurityTrustHtml(safeHtml);
  }

  highlightCode(code: string, language: string): string {
    if (!(language && highlightjs.getLanguage(language))) {
      // use 'markdown' as default language
      language = 'markdown';
    }

    const result = highlightjs.highlight(language, code).value;
    return `<code class="hljs code-block ${language}">${result}</code>`;
  }
}
