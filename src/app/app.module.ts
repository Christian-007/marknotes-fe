import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarModule } from './shared/components/topbar/topbar.module';
import {
  markdownParserProvider,
  codeHighlighterProvider,
  customSanitizerProvider,
  markdownStoreProvider,
} from './app.module.config';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';

import { NotesEffects } from 'src/app/pages/notes/shared/effects/notes.effects';
import { reducers } from './pages/notes/shared/reducers';

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
    markdownStoreProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
