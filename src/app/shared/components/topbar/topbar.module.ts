import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopbarComponent } from './topbar.component';
import { ButtonWithIconModule } from '../buttons/button-with-icon/button-with-icon.module';

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule, ButtonWithIconModule],
  exports: [TopbarComponent],
})
export class TopbarModule {}
