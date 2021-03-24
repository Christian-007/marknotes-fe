import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LandingTopbarComponent } from './landing-topbar.component';

@NgModule({
  declarations: [LandingTopbarComponent],
  imports: [RouterModule],
  exports: [LandingTopbarComponent],
})
export class LandingTopbarModule {}
