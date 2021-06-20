import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundContainerComponent } from './presentation/pages/not-found/not-found-container.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./presentation/pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./presentation/pages/notes/notes.module').then(
        m => m.NotesModule,
      ),
  },
  {
    path: '**',
    component: NotFoundContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
