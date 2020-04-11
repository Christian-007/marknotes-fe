import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  markedProvider,
  highlightJsProvider,
  customSanitizerProvider,
} from './notes.module.config';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NotesComponent } from './notes.component';
import { routes } from './router';

@NgModule({
  declarations: [NotesComponent, NoteDetailsComponent],
  imports: [RouterModule.forChild(routes), FormsModule],
  providers: [markedProvider, highlightJsProvider, customSanitizerProvider],
})
export class NotesModule {}
