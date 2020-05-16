import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileNoteListComponent } from './mobile-note-list.component';
import { CustomButtonModule } from '../buttons/custom-button.module';

@NgModule({
  declarations: [MobileNoteListComponent],
  imports: [CommonModule, CustomButtonModule],
  exports: [MobileNoteListComponent],
})
export class MobileNoteListModule {}
