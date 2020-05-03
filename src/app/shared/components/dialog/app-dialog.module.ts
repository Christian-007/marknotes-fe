import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomButtonModule } from '../buttons/custom-button.module';
import { AppDialogComponent } from './app-dialog.component';

@NgModule({
  declarations: [AppDialogComponent],
  imports: [CommonModule, CustomButtonModule],
  exports: [AppDialogComponent],
})
export class AppDialogModule {}
