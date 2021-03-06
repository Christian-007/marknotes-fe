import { EventEmitter, Type, ComponentRef } from '@angular/core';

export interface DynamicComponent {
  data: any;
  actions: EventEmitter<any>;
}

interface DynamicItemProperty {
  data: any;
  onAction: (emittedValues: ClickedItemData) => void;
}

export interface DynamicItemRef extends DynamicItemProperty {
  component: Type<any>;
}

export interface DynamicComponentRef {
  id: string;
  component: ComponentRef<any>;
}

export interface ClickedItemData {
  id: string;
  type: any;
}
