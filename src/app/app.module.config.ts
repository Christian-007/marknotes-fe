import { Provider } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Marked } from 'src/app/shared/services/markdown-parser/marked';
import { MarkdownParser } from 'src/app/shared/services/markdown-parser/markdown-parser';
import { CodeHighlighter } from 'src/app/shared/services/code-highlighter/code-highlighter';
import { HighlightJs } from 'src/app/shared/services/code-highlighter/highlight-js';
import { CustomSanitizer } from 'src/app/shared/services/custom-sanitizer/custom-sanitizer';
import { DomPurify } from 'src/app/shared/services/custom-sanitizer/dom-purify';
import { MarkdownStore } from './shared/services/store/markdown.store';
import { MarkdownState } from './shared/services/store/markdown-state.model';
import { Toolbar } from './shared/enums/toolbars.enum';

// Factories
export const markedFactory = (
  sanitizer: DomSanitizer,
  codeHighlighter: CodeHighlighter,
  customSaniziter: CustomSanitizer,
): Marked => {
  return new Marked(sanitizer, codeHighlighter, customSaniziter);
};

export const markdownStoreFactory = (): MarkdownStore => {
  const initialState: MarkdownState = {
    markdownText: '',
    htmlText: '',
    checked: {
      [Toolbar.Preview]: true,
    },
    currentActiveNote: null,
    notes: [],
  };
  return new MarkdownStore(initialState);
};

// Providers
export const markdownParserProvider: Provider = {
  provide: MarkdownParser,
  useFactory: markedFactory,
  deps: [DomSanitizer, CodeHighlighter, CustomSanitizer],
};

export const codeHighlighterProvider: Provider = {
  provide: CodeHighlighter,
  useClass: HighlightJs,
};

export const customSanitizerProvider: Provider = {
  provide: CustomSanitizer,
  useClass: DomPurify,
};

export const markdownStoreProvider: Provider = {
  provide: MarkdownStore,
  useFactory: markdownStoreFactory,
};
