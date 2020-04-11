import { DomSanitizer } from '@angular/platform-browser';

import { Marked } from 'src/app/shared/services/markdown-parser/marked';
import { MarkdownParser } from 'src/app/shared/services/markdown-parser/markdown-parser';
import { CodeHighlighter } from 'src/app/shared/services/code-highlighter/code-highlighter';
import { HighlightJs } from 'src/app/shared/services/code-highlighter/highlight-js';
import { CustomSanitizer } from 'src/app/shared/services/custom-sanitizer/custom-sanitizer';
import { DomPurify } from 'src/app/shared/services/custom-sanitizer/dom-purify';
import { Provider } from '@angular/core';

export const markedFactory = (
  sanitizer: DomSanitizer,
  codeHighlighter: CodeHighlighter,
  customSaniziter: CustomSanitizer,
): Marked => {
  return new Marked(sanitizer, codeHighlighter, customSaniziter);
};

export const markedProvider: Provider = {
  provide: MarkdownParser,
  useFactory: markedFactory,
  deps: [DomSanitizer, CodeHighlighter, CustomSanitizer],
};

export const highlightJsProvider: Provider = {
  provide: CodeHighlighter,
  useClass: HighlightJs,
};

export const customSanitizerProvider: Provider = {
  provide: CustomSanitizer,
  useClass: DomPurify,
};
