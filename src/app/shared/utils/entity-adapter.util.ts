import { INote } from '@app/shared/models/markdown-state.model';
import { DynamicComponentRef } from '../models/dynamic-component.model';

export function sortDescendingByDateCreated(a: INote, b: INote): number {
  return b.dateCreated - a.dateCreated;
}

export function selectComponentId(component: DynamicComponentRef): string {
  return component.data.id;
}
