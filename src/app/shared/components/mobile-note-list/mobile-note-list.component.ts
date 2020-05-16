import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-mobile-note-list',
  templateUrl: './mobile-note-list.component.html',
  styleUrls: ['./mobile-note-list.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0 }),
        animate(
          '200ms',
          style({ transform: 'translate3d(0, 0, 0)', opacity: 1 }),
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translate3d(0, 0, 0)', opacity: 1 }),
        animate(
          '200ms',
          style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0 }),
        ),
      ]),
    ]),
  ],
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
