import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';
import { CardModule } from '../card/card.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, CardModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
