import { NgModule } from '@angular/core';

import { NotFoundContainerComponent } from './not-found-container.component';
import { NotFoundComponent } from './not-found.component';

import { LandingTopbarModule } from '@app/presentation/shared/components/topbar/landing/landing-topbar.module';

@NgModule({
  declarations: [NotFoundContainerComponent, NotFoundComponent],
  imports: [LandingTopbarModule],
  exports: [NotFoundContainerComponent, NotFoundComponent],
})
export class NotFoundModule {}
