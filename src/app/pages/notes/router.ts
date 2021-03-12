import { NotesComponent } from './notes.component';
import { NoteDetailComponent } from './detail/note-detail.component';

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
