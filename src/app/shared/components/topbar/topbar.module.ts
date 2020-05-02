import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TopbarComponent } from './topbar.component';
import { CustomButtonModule } from '../buttons/custom-button.module';
import { NoteTitleComponent } from './note-title/note-title.component';

@NgModule({
  declarations: [TopbarComponent, NoteTitleComponent],
  imports: [CommonModule, FormsModule, CustomButtonModule],
  exports: [TopbarComponent],
})
export class TopbarModule {}
