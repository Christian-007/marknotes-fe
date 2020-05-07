import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  ComponentRef,
} from '@angular/core';

import { ContainerHostDirective } from '@app/shared/directives/container-host.directive';
import {
  DynamicComponent,
  DynamicItemRef,
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

  build(dynamicItem: DynamicItemRef): ComponentRef<DynamicComponent> {
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

    return createdComponent;
  }

  insert(componentRef: ComponentRef<DynamicComponent>): void {
    const { viewContainerRef } = this.containerHost;
    viewContainerRef.insert(componentRef.hostView);
  }

  destroy(componentRef: ComponentRef<DynamicComponent>): void {
    componentRef.destroy();
  }

  clearAll(): void {
    const { viewContainerRef } = this.containerHost;
    viewContainerRef.clear();
  }
}
