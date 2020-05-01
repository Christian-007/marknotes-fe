import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  template: `
    <button
      type="button"
      class="BtnIcon btn d-flex align-items-center"
      [ngClass]="getClassName()"
      [ngStyle]="buttonStyles"
      [attr.aria-label]="icon"
      (click)="onButtonClick()"
    >
      <i aria-hidden="true" class="material-icons md-18">{{ icon }}</i>
    </button>
  `,
  styleUrls: ['./app-toggle-button.component.scss'],
})
export class AppToggleButtonComponent {
  @Input() icon: string;
  @Input() size: string;
  @Input() checked: boolean;
  @Input() buttonStyles: {};
  @Output() buttonClick: EventEmitter<boolean>;

  constructor() {
    this.icon = 'not_interested';
    this.buttonClick = new EventEmitter();
    this.checked = false;
  }

  onButtonClick(): void {
    this.checked = !this.checked;

    this.buttonClick.emit(this.checked);
  }

  getClassName(): string {
    if (this.checked) {
      return `Active`;
    }

    return null;
  }
}
