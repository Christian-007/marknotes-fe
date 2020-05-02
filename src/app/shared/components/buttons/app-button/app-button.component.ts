import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      type="button"
      class="BtnIcon btn d-flex align-items-center"
      [ngStyle]="buttonStyles"
      (click)="onButtonClick()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent {
  @Input() text: string;
  @Input() buttonStyles: {};
  @Output() buttonClick: EventEmitter<null>;

  constructor() {
    this.text = 'Undefined';
    this.buttonClick = new EventEmitter();
  }

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
