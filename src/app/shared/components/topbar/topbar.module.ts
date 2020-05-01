import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopbarComponent } from './topbar.component';
import { AppToggleButtonModule } from '../buttons/app-toggle-button/app-toggle-button.module';

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule, AppToggleButtonModule],
  exports: [TopbarComponent],
})
export class TopbarModule {}
