import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  template: `
    <button
      type="button"
      class="BtnIcon btn d-flex align-items-center"
      [ngClass]="getClassName()"
      [ngStyle]="buttonStyles"
      (click)="onButtonClick()"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./app-toggle-button.component.scss'],
})
export class AppToggleButtonComponent {
  @Input() checked: boolean;
  @Input() buttonStyles: {};
  @Input() disabled: boolean;
  @Output() buttonClick: EventEmitter<boolean>;

  constructor() {
    this.buttonClick = new EventEmitter();
    this.checked = false;
    this.disabled = false;
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
