import { Component } from '@angular/core';

import { NotesService } from '@app/pages/notes/notes.service';
import { EStorageStrategy } from '@app/shared/enums/strategy.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'marknotes-fe';
  isNoteListOpen = false;

  constructor(private notesService: NotesService) {
    this.notesService.setStorageStrategy(EStorageStrategy.LocalStorage);
  }
}
