import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarDialogComponent } from './toolbar-dialog.component';
import { CustomButtonModule } from '../buttons/custom-button.module';

@NgModule({
  declarations: [ToolbarDialogComponent],
  imports: [CommonModule, CustomButtonModule],
  exports: [ToolbarDialogComponent],
})
export class ToolbarDialogModule {}
