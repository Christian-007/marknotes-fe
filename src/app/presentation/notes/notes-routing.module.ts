import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './containers/notes.component';
import { NoteDetailComponent } from './containers/note-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: ':id',
        component: NoteDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
