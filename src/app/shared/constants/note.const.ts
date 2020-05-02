import { INote } from '@app/shared/services/store/markdown-state.model';
import { generateRandomId } from '@app/shared/utils/generator.util';

export const createDefaultNote = (): INote => ({
  id: generateRandomId(),
  title: 'Untitled Document',
  dateCreated: Date.now(),
  htmlText: '',
  markdownText: '',
});
