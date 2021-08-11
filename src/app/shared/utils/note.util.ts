import { INote } from '@app/shared/models/markdown-state.model';
import { generateRandomId } from '@app/shared/utils/generator.util';

export class NoteUtil {
  static createDefault(): INote {
    return {
      id: generateRandomId(),
      title: 'Untitled Document',
      dateCreated: Date.now(),
      htmlText: '',
      markdownText: '',
    };
  }
}
