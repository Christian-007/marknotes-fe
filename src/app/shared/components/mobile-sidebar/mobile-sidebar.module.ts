import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileSidebarComponent } from './mobile-sidebar.component';
import { CustomButtonModule } from '../buttons/custom-button.module';

@NgModule({
  declarations: [MobileSidebarComponent],
  imports: [CommonModule, CustomButtonModule],
  exports: [MobileSidebarComponent],
})
export class MobileSidebarModule {}
