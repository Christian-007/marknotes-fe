import { NotesComponent } from './notes.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

export const routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: '',
        redirectTo: 'note',
        pathMatch: 'full',
      },
      {
        path: 'note',
        component: NoteDetailsComponent,
      },
    ],
  },
];
