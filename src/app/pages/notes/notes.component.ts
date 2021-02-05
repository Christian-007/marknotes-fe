import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  template: `
    <div class="flex flex-col w-full h-full">
      <app-topbar></app-topbar>
      <div class="flex flex-row w-full h-full overflow-hidden">
        <div class="w-1/5 h-full p-4 overflow-auto">
          <app-sidebar></app-sidebar>
        </div>
        <div class="w-4/5 h-full p-4 overflow-auto">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {}
