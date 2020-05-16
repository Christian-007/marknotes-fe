import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-note-list',
  templateUrl: './mobile-note-list.component.html',
  styleUrls: ['./mobile-note-list.component.scss'],
})
export class MobileNoteListComponent implements OnInit {
  closeButtonStyles: {};
  noteListButtonStyles: {};
  addButtonStyles: {};

  constructor() {
    this.closeButtonStyles = {
      'border-left': '1px solid #e3e3e3',
      padding: '1rem',
      'border-radius': 0,
    };
    this.noteListButtonStyles = {
      'border-radius': 0,
      'text-align': 'left',
      padding: 0,
    };
    this.addButtonStyles = {
      'background-color': '#f2f2f2',
      color: '#000',
      'text-align': 'center',
      'border-radius': '2px',
      'font-size': '0.8rem',
      'justify-content': 'center',
    };
  }

  ngOnInit() {}

  onClickClose(): void {}
}
