import { Component } from '@angular/core';

import { NotesService } from '@app/core/repositories/notes/notes.service';
import { ENotesStrategy } from '@app/presentation/shared/enums/notes-strategy.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'marknotes-fe';
  isNoteListOpen = false;

  constructor(private notesService: NotesService) {
    this.notesService.setStorageStrategy(ENotesStrategy.LocalStorage);
  }
}
