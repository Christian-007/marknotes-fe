import { INote } from '@app/shared/models/markdown-state.model';

export function sortDescendingByDateCreated(a: INote, b: INote): number {
  return b.dateCreated - a.dateCreated;
}
