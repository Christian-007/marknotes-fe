import { EventEmitter, Type } from '@angular/core';

import { Click } from '../enums/ui-actions.enum';

export interface DynamicComponent {
  data: any;
  actions: EventEmitter<any>;
}

export interface DynamicItem {
  component: Type<any>;
  data: any;
  onAction: (emittedValues: ClickedItemData) => void;
}

export interface ClickedItemData {
  id: string;
  type: Click;
}
