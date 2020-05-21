import { Injectable } from '@angular/core';

import * as highlightjs from 'highlight.js';

import { CodeHighlighter } from './code-highlighter';

@Injectable()
export class HighlightJs extends CodeHighlighter {
  highlight(code: string, language: string): string {
    const isNotFoundLanguage = !highlightjs.getLanguage(language);
    if (isNotFoundLanguage) {
      // use 'markdown' as default language
      language = 'markdown';
    }

    const result = highlightjs.highlight(language, code).value;
    return `<code class="hljs code-block ${language}">${result}</code>`;
  }
}
