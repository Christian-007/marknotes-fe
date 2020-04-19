import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onClickAdd(): void {
    console.log('hello on add');
  }
}
