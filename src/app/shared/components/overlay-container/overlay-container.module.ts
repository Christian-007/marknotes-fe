import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerHostDirective } from '@app/shared/directives/container-host.directive';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogModule } from '../dialog/dialog.module';
import { OverlayContainerComponent } from './overlay-container.component';

@NgModule({
  declarations: [OverlayContainerComponent, ContainerHostDirective],
  entryComponents: [DialogComponent],
  imports: [CommonModule, DialogModule],
  exports: [OverlayContainerComponent],
})
export class OverlayContainerModule {}
