import { Injectable } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import * as marked from 'marked';

import { MarkdownParser } from './markdown-parser';
import { CodeHighlighter } from '../code-highlighter/code-highlighter';
import { CustomSanitizer } from '../custom-sanitizer/custom-sanitizer';

@Injectable()
export class Marked extends MarkdownParser {
  markdownParser: typeof marked;

  constructor(
    private sanitizer: DomSanitizer,
    private codeHighlighter: CodeHighlighter,
    private customSanitizer: CustomSanitizer,
  ) {
    super();
    this.setMarkdownRendererConfig();
  }

  convert(markdownTexts: string): SafeHtml {
    const html = this.markdownParser(markdownTexts);
    const safeHtml = this.customSanitizer.sanitize(html);
    return this.sanitizer.bypassSecurityTrustHtml(safeHtml);
  }

  private setMarkdownRendererConfig(): void {
    const markdownRenderer = new marked.Renderer();
    markdownRenderer.code = this.codeHighlighter.highlight;
    this.markdownParser = marked.setOptions({ renderer: markdownRenderer });
  }
}
