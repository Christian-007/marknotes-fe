import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  template: `
    <button
      type="button"
      class="BtnIcon btn d-flex align-items-center"
      [attr.aria-label]="icon"
      (click)="buttonClick.emit()"
    >
      <i aria-hidden="true" class="material-icons">{{ icon }}</i>
    </button>
  `,
  styleUrls: ['./button-with-icon.component.scss'],
})
export class ButtonWithIconComponent {
  @Input() icon: string;
  @Output() buttonClick: EventEmitter<any>;

  constructor() {
    this.icon = 'not_interested';
    this.buttonClick = new EventEmitter();
  }
}
