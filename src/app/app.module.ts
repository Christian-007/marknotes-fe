import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  markdownParserProvider,
  codeHighlighterProvider,
  customSanitizerProvider,
  notesServiceProvider,
} from './app.module.config';

import { NotFoundModule } from '@app/presentation/not-found/not-found.module';
import { NotesEffects } from '@app/presentation/notes/effects/notes.effects';
import { reducers, REDUCERS_TOKEN } from '@app/presentation/notes/reducers';
import { LocalStorageStrategy } from '@app/core/repositories/notes/strategy/local-storage-strategy';
import { OverlayContainerComponent } from '@app/shared/components/overlay-container/overlay-container.component';
import { OverlayContainerModule } from '@app/shared/components/overlay-container/overlay-container.module';
import { NavigationsEffects } from '@app/presentation/notes/effects/navigations.effects';
import { ToolbarDialogModule } from '@app/shared/components/toolbar-dialog/toolbar-dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayContainerModule,
    StoreModule.forRoot(REDUCERS_TOKEN),
    EffectsModule.forRoot([NotesEffects, NavigationsEffects]),
    StoreDevtoolsModule.instrument({}),
    ToolbarDialogModule,
    NotFoundModule,
  ],
  providers: [
    markdownParserProvider,
    codeHighlighterProvider,
    customSanitizerProvider,
    LocalStorageStrategy,
    notesServiceProvider,
    {
      provide: REDUCERS_TOKEN,
      useValue: reducers,
    },
  ],
  bootstrap: [AppComponent, OverlayContainerComponent],
})
export class AppModule {}
