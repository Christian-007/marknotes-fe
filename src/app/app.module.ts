import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

import { StoreModule } from '@ngrx/store';
import { notesReducer } from './pages/notes/shared/reducers/notes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects } from 'src/app/pages/notes/shared/effects/notes.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopbarModule,
    SidebarModule,
    StoreModule.forRoot({ notes: notesReducer }),
    EffectsModule.forRoot([NotesEffects]),
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
