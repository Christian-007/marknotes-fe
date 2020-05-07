import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarModule } from '@app/shared/components/topbar/topbar.module';
import {
  markdownParserProvider,
  codeHighlighterProvider,
  customSanitizerProvider,
  notesServiceProvider,
} from './app.module.config';
import { SidebarModule } from '@app/shared/components/sidebar/sidebar.module';

import { NotesEffects } from '@app/shared/store/effects/notes.effects';
import { reducers } from '@app/shared/store/reducers';
import { LocalStorageStrategy } from '@app/shared/services/storage-strategy/local-storage-strategy';
import { OverlayContainerComponent } from '@app/shared/components/overlay-container/overlay-container.component';
import { OverlayContainerModule } from './shared/components/overlay-container/overlay-container.module';
import { DynamicComponentEffects } from './shared/store/effects/dynamic-component.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopbarModule,
    SidebarModule,
    OverlayContainerModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([NotesEffects, DynamicComponentEffects]),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [
    markdownParserProvider,
    codeHighlighterProvider,
    customSanitizerProvider,
    LocalStorageStrategy,
    notesServiceProvider,
  ],
  bootstrap: [AppComponent, OverlayContainerComponent],
})
export class AppModule {}
