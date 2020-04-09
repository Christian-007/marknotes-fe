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
  text: string;
  data: SafeHtml;
  md: any;

  constructor(private sanitizer: DomSanitizer) {
    const renderer = new marked.Renderer();
    renderer.code = this.highlightCode;
    this.md = marked.setOptions({ renderer });
    this.text =
      '# Hello Markdown\n```ts\nimport { Providers } from "@providers/provider";\n\nexport class Encryptor {\n  encryptionMethod: string; \n}\n```';
  }

  ngOnInit() {
    this.data = this.markdownToSafeHtml(this.text);
  }

  markdownToSafeHtml(markdownTexts: string): SafeHtml {
    const html = this.md(markdownTexts);
    const safeHtml = DOMPurify.sanitize(html);
    return this.sanitizer.bypassSecurityTrustHtml(safeHtml);
  }

  highlightCode(code: string, language: string): string {
    if (!(language && highlightjs.getLanguage(language))) {
      // use 'markdown' as default language
      language = 'markdown';
    }

    const result = highlightjs.highlight(language, code).value;
    return `<code class="hljs ${language}">${result}</code>`;
  }
}
