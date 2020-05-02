import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { CustomButtonModule } from '../buttons/custom-button.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, CustomButtonModule],
  exports: [CardComponent],
})
export class CardModule {}
