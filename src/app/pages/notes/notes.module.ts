import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NoteDetailsComponent } from './note-details/note-details.component';
import { NotesComponent } from './notes.component';
import { routes } from './router';

@NgModule({
  declarations: [NotesComponent, NoteDetailsComponent],
  imports: [RouterModule.forChild(routes), FormsModule],
})
export class NotesModule {}
