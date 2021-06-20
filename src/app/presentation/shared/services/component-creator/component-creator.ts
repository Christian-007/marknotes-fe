import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  ComponentRef,
} from '@angular/core';

import { ContainerHostDirective } from '@app/presentation/shared/directives/container-host.directive';
import {
  DynamicComponent,
  DynamicItemRef,
  DynamicComponentRef,
} from '@app/presentation/shared/models/dynamic-component.model';
import { Click } from '@app/presentation/shared/enums/ui-actions.enum';

@Injectable({
  providedIn: 'root',
})
export class ComponentCreator {
  containerHost: ContainerHostDirective;
  componentRefs: DynamicComponentRef[];

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.containerHost = null;
    this.componentRefs = [];
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

    this.componentRefs.push({ id: data.id, component: createdComponent });

    return createdComponent;
  }

  insert(componentRef: ComponentRef<DynamicComponent>): void {
    const { viewContainerRef } = this.containerHost;
    viewContainerRef.insert(componentRef.hostView);
  }

  destroy(componentId: string): void {
    const findComponent = this.componentRefs.find(
      (component: DynamicComponentRef) => component.id === componentId,
    );

    if (findComponent) {
      findComponent.component.destroy();
      this.removeComponentFromList(componentId);
    }
  }

  clearAll(): void {
    const { viewContainerRef } = this.containerHost;
    viewContainerRef.clear();
  }

  private removeComponentFromList(componentId: string): void {
    const filteredComponent = this.componentRefs.filter(
      (component: DynamicComponentRef) => component.id !== componentId,
    );
    this.componentRefs = filteredComponent;
  }
}
