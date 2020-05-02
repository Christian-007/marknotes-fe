import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-title',
  templateUrl: './note-title.component.html',
  styleUrls: ['./note-title.component.scss'],
})
export class NoteTitleComponent {
  @Input() title: string;
  @Output() submitEdit: EventEmitter<string>;

  isEditting: boolean;

  constructor() {
    this.isEditting = false;
    this.submitEdit = new EventEmitter();
    this.title = '';
  }

  onClickEdit(): void {
    this.isEditting = true;
  }

  onSubmitEdit(): void {
    this.isEditting = false;
    this.submitEdit.emit(this.title);
  }

  onCancelEdit(): void {
    this.isEditting = false;
  }
}
