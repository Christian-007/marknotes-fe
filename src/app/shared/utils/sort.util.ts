import { INote } from 'src/app/shared/services/store/markdown-state.model';

export function sortDescendingByDateCreated(a: INote, b: INote): number {
  return b.dateCreated - a.dateCreated;
}
