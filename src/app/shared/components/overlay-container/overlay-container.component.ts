import { Component, OnInit, ViewChild } from '@angular/core';

import { ContainerHostDirective } from '@app/shared/directives/container-host.directive';
import { ComponentCreator } from '@app/shared/services/component-creator/component-creator';

@Component({
  selector: 'app-overlay-container',
  template: `
    <ng-template appContainerHost></ng-template>
  `,
})
export class OverlayContainerComponent implements OnInit {
  @ViewChild(ContainerHostDirective, { static: true })
  containerHost: ContainerHostDirective;

  constructor(private componentCreator: ComponentCreator) {}

  ngOnInit() {
    this.componentCreator.setContainerHost(this.containerHost);
  }
}
