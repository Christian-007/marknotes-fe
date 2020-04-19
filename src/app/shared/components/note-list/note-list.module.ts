import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteListComponent } from './note-list.component';
import { ButtonWithIconModule } from '../buttons/button-with-icon/button-with-icon.module';

@NgModule({
  declarations: [NoteListComponent],
  imports: [CommonModule, ButtonWithIconModule],
  exports: [NoteListComponent],
})
export class NoteListModule {}
