import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';

import { ContainerHostDirective } from '@app/shared/directives/container-host.directive';
import {
  DynamicComponent,
  DynamicItem,
} from '@app/shared/models/dynamic-component.model';
import { Click } from '@app/shared/enums/ui-actions.enum';

@Injectable({
  providedIn: 'root',
})
export class ComponentCreator {
  containerHost: ContainerHostDirective;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.containerHost = null;
  }

  setContainerHost(containerHost: ContainerHostDirective): void {
    this.containerHost = containerHost;
  }

  build(dynamicItem: DynamicItem): void {
    this.clearAll(); // clear created components

    const { component, data, onAction } = dynamicItem;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component,
    );
    const createdComponent = componentFactory.create(this.injector);
    (createdComponent.instance as DynamicComponent).data = data;
    (createdComponent.instance as DynamicComponent).actions.subscribe(
      (emittedValues: { id: string; type: Click }) => {
        onAction(emittedValues);
      },
    );

    const { viewContainerRef } = this.containerHost;
    viewContainerRef.insert(createdComponent.hostView);
  }

  clearAll(): void {
    const { viewContainerRef } = this.containerHost;
    viewContainerRef.clear();
  }
}
