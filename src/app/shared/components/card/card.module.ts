import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { AppToggleButtonModule } from '../buttons/app-toggle-button/app-toggle-button.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, AppToggleButtonModule],
  exports: [CardComponent],
})
export class CardModule {}
