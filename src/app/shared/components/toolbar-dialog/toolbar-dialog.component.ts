import { Component, Output, EventEmitter } from '@angular/core';

import { DynamicComponent } from '@app/shared/models/dynamic-component.model';
import { Toolbar } from '@app/shared/enums/ui-actions.enum';

@Component({
  selector: 'app-toolbar-dialog',
  templateUrl: './toolbar-dialog.component.html',
  styleUrls: ['./toolbar-dialog.component.scss'],
})
export class ToolbarDialogComponent implements DynamicComponent {
  closeButtonStyles: {};
  toolbarButtonStyles: {};
  data: any;
  Toolbar: typeof Toolbar;

  @Output() actions: EventEmitter<any>;

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
    this.Toolbar = Toolbar;
    this.actions = new EventEmitter();
  }

  onActions(type: Toolbar): void {
    this.actions.emit({ id: this.data.id, type });
  }
}
