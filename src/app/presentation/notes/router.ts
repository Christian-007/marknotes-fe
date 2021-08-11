import { NotesComponent } from './containers/notes.component';
import { NoteDetailComponent } from './containers/note-detail.component';

export const routes = [
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
