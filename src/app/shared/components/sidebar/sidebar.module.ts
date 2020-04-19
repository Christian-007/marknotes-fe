import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';
import { NoteListModule } from '../note-list/note-list.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, NoteListModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
