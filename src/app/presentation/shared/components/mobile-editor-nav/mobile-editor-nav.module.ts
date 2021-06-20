import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileEditorNavComponent } from './mobile-editor-nav.component';
import { CustomButtonModule } from '../buttons/custom-button.module';

@NgModule({
  declarations: [MobileEditorNavComponent],
  imports: [CommonModule, CustomButtonModule],
  exports: [MobileEditorNavComponent],
})
export class MobileEditorNavModule {}
