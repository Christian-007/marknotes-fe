import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  template: `
    <button
      type="button"
      class="BtnIcon btn d-flex align-items-center"
      [attr.aria-label]="icon"
    >
      <i aria-hidden="true" class="material-icons">{{ icon }}</i>
    </button>
  `,
  styleUrls: ['./button-with-icon.component.scss'],
})
export class ButtonWithIconComponent {
  @Input() icon: string;

  constructor() {
    this.icon = 'not_interested';
  }
}
