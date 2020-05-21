import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyNoteTitle',
})
export class EmptyNoteTitlePipe implements PipeTransform {
  transform(noteTitle: string): string {
    if (noteTitle.length === 0) {
      return 'Untitled Document';
    }
    return noteTitle;
  }
}
