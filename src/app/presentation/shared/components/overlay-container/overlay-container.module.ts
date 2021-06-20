import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from '../dialog/dialog.module';
import { OverlayContainerComponent } from './overlay-container.component';
import { ToolbarDialogModule } from '../toolbar-dialog/toolbar-dialog.module';

import { ContainerHostDirective } from '@app/presentation/shared/directives/container-host.directive';

@NgModule({
  declarations: [OverlayContainerComponent, ContainerHostDirective],
  imports: [CommonModule, DialogModule, ToolbarDialogModule],
  exports: [OverlayContainerComponent],
})
export class OverlayContainerModule {}
