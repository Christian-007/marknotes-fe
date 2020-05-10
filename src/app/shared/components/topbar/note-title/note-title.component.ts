import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-title',
  templateUrl: './note-title.component.html',
  styleUrls: ['./note-title.component.scss'],
})
export class NoteTitleComponent {
  @Input() title: string;
  @Input() isEditingTitle: boolean;
  @Output() submitEdit: EventEmitter<string>;
  @Output() editTitle: EventEmitter<any>;

  constructor() {
    this.submitEdit = new EventEmitter();
    this.editTitle = new EventEmitter();
    this.title = '';
    this.isEditingTitle = false;
  }

  onClickEdit(): void {
    this.editTitle.emit(true);
  }

  onSubmitEdit(): void {
    this.isEditingTitle = false;
    this.submitEdit.emit(this.title);
  }

  onCancelEdit(): void {
    this.editTitle.emit(false);
  }
}
