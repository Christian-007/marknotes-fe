import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonComponent } from 'src/app/shared/components/buttons/app-button/app-button.component';
import { AppToggleButtonComponent } from 'src/app/shared/components/buttons/app-toggle-button/app-toggle-button.component';

@NgModule({
  declarations: [AppButtonComponent, AppToggleButtonComponent],
  imports: [CommonModule],
  exports: [AppToggleButtonComponent, AppButtonComponent],
})
export class CustomButtonModule {}
