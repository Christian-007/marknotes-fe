import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { CustomButtonModule } from '../buttons/custom-button.module';
import { PipeModule } from '@app/shared/pipes/pipe.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, CustomButtonModule, PipeModule],
  exports: [CardComponent],
})
export class CardModule {}
