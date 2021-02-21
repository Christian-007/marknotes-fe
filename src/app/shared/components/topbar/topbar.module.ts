import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TopbarComponent } from './topbar.component';
import { CustomButtonModule } from '../buttons/custom-button.module';

import { PipeModule } from '@app/shared/pipes/pipe.module';

@NgModule({
  declarations: [TopbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomButtonModule,
    PipeModule,
    RouterModule,
  ],
  exports: [TopbarComponent],
})
export class TopbarModule {}
