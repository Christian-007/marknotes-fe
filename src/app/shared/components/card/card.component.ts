import { Component, OnInit } from '@angular/core';

import { MarkdownStore } from '../../services/store/markdown.store';
import {
  INote,
  MarkdownState,
} from '../../services/store/markdown-state.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  notes: INote[];
  currentActiveNote: INote;
  buttonStyles: {};

  constructor(private markdownStore: MarkdownStore) {
    this.buttonStyles = {
      'padding-right': 0,
    };
  }

  ngOnInit() {
    this.markdownStore.state$.subscribe((state: MarkdownState) => {
      this.notes = state.notes;
      this.currentActiveNote = state.currentActiveNote;
    });
  }

  onClickAddNote(): void {
    console.log('hello on add');
    this.markdownStore.createNote();
  }

  onClickNoteList(docId: string): void {
    console.log('Document Click: ', docId);
    // this.currentActiveNoteId = docId;
  }
}
