import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomButtonModule } from '../buttons/custom-button.module';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, CustomButtonModule],
  exports: [DialogComponent],
})
export class DialogModule {}
