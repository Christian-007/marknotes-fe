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

import { NotesEffects } from '@app/pages/notes/shared/effects/notes.effects';
import { reducers } from '@app/pages/notes/shared/reducers';
import { LocalStorageStrategy } from '@app/shared/services/storage-strategy/local-storage-strategy';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopbarModule,
    SidebarModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([NotesEffects]),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [
    markdownParserProvider,
    codeHighlighterProvider,
    customSanitizerProvider,
    LocalStorageStrategy,
    notesServiceProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
