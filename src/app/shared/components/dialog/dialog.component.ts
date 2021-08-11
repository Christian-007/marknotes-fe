import { Component, Output, EventEmitter, Input } from '@angular/core';

import { DynamicComponent } from '@app/shared/models/dynamic-component.model';
import { Click } from '@app/shared/enums/ui-actions.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements DynamicComponent {
  @Input() data: any;
  @Output() actions: EventEmitter<any>;

  buttonStyles: {};
  Click: typeof Click;

  constructor() {
    this.buttonStyles = {
      padding: 0,
      color: '#000',
    };
    this.actions = new EventEmitter();
    this.Click = Click;
  }

  onActions(type: Click): void {
    this.actions.emit({ id: this.data.id, type });
  }
}
