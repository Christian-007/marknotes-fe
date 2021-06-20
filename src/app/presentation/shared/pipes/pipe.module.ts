import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyNoteTitlePipe } from '@app/presentation/shared/pipes/empty-note-title/empty-note-title.pipe';

@NgModule({
  declarations: [EmptyNoteTitlePipe],
  imports: [CommonModule],
  exports: [EmptyNoteTitlePipe],
})
export class PipeModule {}
