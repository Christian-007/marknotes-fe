import { SafeHtml } from '@angular/platform-browser';

export interface INote {
  id: string;
  markdownText: string;
  htmlText: SafeHtml;
  title: string;
  dateCreated: number;
}
