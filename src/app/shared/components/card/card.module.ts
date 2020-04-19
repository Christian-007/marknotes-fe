import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { ButtonWithIconModule } from '../buttons/button-with-icon/button-with-icon.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, ButtonWithIconModule],
  exports: [CardComponent],
})
export class CardModule {}
