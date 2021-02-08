import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@app/shared/store/reducers';

@Component({
  selector: 'app-notes',
  template: `
    <div class="flex flex-col w-full h-full">
      <app-topbar></app-topbar>
      <div class="flex flex-row w-full h-full overflow-hidden">
        <div class="w-1/5 h-full p-4 overflow-auto">
          <app-sidebar></app-sidebar>
        </div>
        <div
          class="w-4/5 h-full p-4 overflow-auto"
          [ngClass]="{ 'bg-gray-200': (isPreview$ | async) === false }"
        >
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class NotesComponent {
  isPreview$: Observable<boolean>;

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.isPreview$ = this.store.pipe(select(fromRoot.selectIsPreview));
  }
}
