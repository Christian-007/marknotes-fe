import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  template: `
    <button
      type="button"
      class="BtnIcon btn d-flex align-items-center"
      [ngClass]="getClassName()"
      [attr.aria-label]="icon"
      (click)="onButtonClick()"
    >
      <i aria-hidden="true" class="material-icons">{{ icon }}</i>
    </button>
  `,
  styleUrls: ['./button-with-icon.component.scss'],
})
export class ButtonWithIconComponent {
  @Input() icon: string;
  @Output() buttonClick: EventEmitter<any>;

  private checked: boolean;

  constructor() {
    this.icon = 'not_interested';
    this.buttonClick = new EventEmitter();
    this.checked = false;
  }

  onButtonClick(): void {
    this.checked = !this.checked;

    this.buttonClick.emit();
  }

  getClassName(): string {
    if (this.checked) {
      return `Active`;
    }

    return null;
  }
}
