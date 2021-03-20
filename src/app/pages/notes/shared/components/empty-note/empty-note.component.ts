import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotesActions } from '@app/shared/store/actions';
import { ApplicationState } from '@app/shared/store/reducers';

@Component({
  selector: 'app-empty-note',
  template: `
    <div id="EmptyNote" class="flex items-center justify-center h-full">
      <div class="flex flex-col items-center">
        <img
          alt="ant-design-no-data"
          src="assets/images/ant-design-no-data.png"
        />
        <div class="text-base text-gray-400">No note</div>
        <button
          class="mt-4 flex items-center text-sm text-white bg-blue-600 hover:bg-blue-800 py-1 px-4 rounded"
          id="CreateNewNoteBtn"
          (click)="onClickNewNote()"
        >
          <i aria-hidden="true" class="material-icons md-18 mr-1">
            add_circle_outline
          </i>
          Create new note
        </button>
      </div>
    </div>
  `,
})
export class EmptyNoteComponent {
  constructor(private store: Store<ApplicationState>) {}

  onClickNewNote(): void {
    this.store.dispatch(NotesActions.addOneNote());
  }
}
