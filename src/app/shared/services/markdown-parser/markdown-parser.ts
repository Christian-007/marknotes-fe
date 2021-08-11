import { SafeHtml } from '@angular/platform-browser';

export abstract class MarkdownParser {
  abstract convert(markdownText: string): SafeHtml;
}
