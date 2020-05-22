import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyNoteTitle',
})
export class EmptyNoteTitlePipe implements PipeTransform {
  transform(noteTitle: string): string {
    if (noteTitle === '') {
      return 'Untitled Document';
    }
    return noteTitle;
  }
}
