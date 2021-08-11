import { NgModule } from '@angular/core';

import { NotFoundContainerComponent } from './containers/not-found-container.component';
import { NotFoundComponent } from './containers/not-found.component';

import { LandingTopbarModule } from '@app/shared/components/topbar/landing/landing-topbar.module';

@NgModule({
  declarations: [NotFoundContainerComponent, NotFoundComponent],
  imports: [LandingTopbarModule],
  exports: [NotFoundContainerComponent, NotFoundComponent],
})
export class NotFoundModule {}
