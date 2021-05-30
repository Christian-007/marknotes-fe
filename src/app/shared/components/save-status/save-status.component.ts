import { Component, Input } from '@angular/core';
import { SaveStatus } from './save-status.enum';

@Component({
  selector: 'app-save-status',
  templateUrl: './save-status.component.html',
})
export class SaveStatusComponent {
  @Input() status: SaveStatus;

  constructor() {
    this.status = SaveStatus.Saved;
  }

  get SaveStatus(): typeof SaveStatus {
    return SaveStatus;
  }
}
