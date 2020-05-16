import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-dialog',
  templateUrl: './toolbar-dialog.component.html',
  styleUrls: ['./toolbar-dialog.component.scss'],
})
export class ToolbarDialogComponent implements OnInit {
  closeButtonStyles: {};
  toolbarButtonStyles: {};

  constructor() {
    this.closeButtonStyles = {
      'border-left': '1px solid #e3e3e3',
      padding: '1rem',
      'border-radius': 0,
    };

    this.toolbarButtonStyles = {
      padding: '1rem 0',
      color: '#000',
    };
  }

  ngOnInit() {}

  onClickClose(): void {}

  onClickPreview(): void {}

  onClickSave(): void {}

  onClickDelete(): void {}
}
