import { Provider } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Marked } from '@app/shared/services/markdown-parser/marked';
import { MarkdownParser } from '@app/shared/services/markdown-parser/markdown-parser';
import { CodeHighlighter } from '@app/shared/services/code-highlighter/code-highlighter';
import { HighlightJs } from '@app/shared/services/code-highlighter/highlight-js';
import { CustomSanitizer } from '@app/shared/services/custom-sanitizer/custom-sanitizer';
import { DomPurify } from '@app/shared/services/custom-sanitizer/dom-purify';
import { NotesService } from './pages/notes/notes.service';
import { StorageStrategy } from './shared/services/storage-strategy/storage-strategy';
import { LocalStorageStrategy } from './shared/services/storage-strategy/local-storage-strategy';

// Factories
export const markedFactory = (
  sanitizer: DomSanitizer,
  codeHighlighter: CodeHighlighter,
  customSaniziter: CustomSanitizer,
): Marked => {
  return new Marked(sanitizer, codeHighlighter, customSaniziter);
};

const notesServiceFactory = (...storageStrategies: StorageStrategy[]) => {
  return new NotesService(storageStrategies);
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

export const notesServiceProvider: Provider = {
  provide: NotesService,
  useFactory: notesServiceFactory,
  deps: [LocalStorageStrategy],
};
