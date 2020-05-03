import { SafeHtml } from '@angular/platform-browser';

export interface MarkdownState {
  markdownText: string;
  htmlText: SafeHtml;
  checked: { [key: string]: boolean };
  currentActiveNote: INote;
  notes: INote[];
}

export interface INote {
  id: string;
  markdownText: string;
  htmlText: SafeHtml;
  title: string;
  dateCreated: number;
}