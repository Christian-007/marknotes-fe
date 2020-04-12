import { SafeHtml } from '@angular/platform-browser';

export interface MarkdownState {
  markdownText: string;
  htmlText: SafeHtml;
}
