import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopbarComponent } from './topbar.component';
import { CustomButtonModule } from '../buttons/custom-button.module';

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule, CustomButtonModule],
  exports: [TopbarComponent],
})
export class TopbarModule {}
