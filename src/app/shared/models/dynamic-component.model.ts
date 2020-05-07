import { EventEmitter, Type, ComponentRef } from '@angular/core';

import { Click } from '../enums/ui-actions.enum';

export interface DynamicComponent {
  data: any;
  actions: EventEmitter<any>;
}

interface DynamicItemProperty {
  data: any;
  onAction: (emittedValues: ClickedItemData) => void;
}

// Before created from componentFactory
export interface DynamicItemRef extends DynamicItemProperty {
  component: Type<any>;
}

// After created from componentFactory
export interface DynamicComponentRef extends DynamicItemProperty {
  component: ComponentRef<any>;
}

export interface ClickedItemData {
  id: string;
  type: Click;
}
