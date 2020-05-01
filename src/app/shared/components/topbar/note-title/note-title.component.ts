import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-title',
  templateUrl: './note-title.component.html',
  styleUrls: ['./note-title.component.scss'],
})
export class NoteTitleComponent {
  @Input() title: string;
  isEditting: boolean;

  constructor() {
    this.isEditting = false;
    this.title = '';
  }

  onClickEdit(): void {
    this.isEditting = true;
  }

  onSubmitEdit(): void {
    this.isEditting = false;
  }

  onCancelEdit(): void {
    this.isEditting = false;
  }
}
