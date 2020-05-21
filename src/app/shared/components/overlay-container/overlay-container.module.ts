import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerHostDirective } from '@app/shared/directives/container-host.directive';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogModule } from '../dialog/dialog.module';
import { OverlayContainerComponent } from './overlay-container.component';
import { ToolbarDialogModule } from '../toolbar-dialog/toolbar-dialog.module';
import { ToolbarDialogComponent } from '../toolbar-dialog/toolbar-dialog.component';

@NgModule({
  declarations: [OverlayContainerComponent, ContainerHostDirective],
  entryComponents: [DialogComponent, ToolbarDialogComponent],
  imports: [CommonModule, DialogModule, ToolbarDialogModule],
  exports: [OverlayContainerComponent],
})
export class OverlayContainerModule {}
