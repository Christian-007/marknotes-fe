import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmptyNoteComponent } from './components/empty-note.component';
import { NoteDetailComponent } from './containers/note-detail.component';
import { NotesComponent } from './containers/notes.component';
import { NotesRoutingModule } from './notes-routing.module';

import { NotFoundModule } from '@app/presentation/not-found/not-found.module';
import { TopbarModule } from '@app/shared/components/topbar/topbar.module';
import { SidebarModule } from '@app/shared/components/sidebar/sidebar.module';
import { MobileEditorNavModule } from '@app/shared/components/mobile-editor-nav/mobile-editor-nav.module';
import { MobileSidebarModule } from '@app/shared/components/mobile-sidebar/mobile-sidebar.module';
import { TextEditorModule } from '@app/shared/components/text-editor/text-editor.module';

@NgModule({
  declarations: [EmptyNoteComponent, NotesComponent, NoteDetailComponent],
  imports: [
    NotesRoutingModule,
    CommonModule,
    FormsModule,
    TopbarModule,
    SidebarModule,
    MobileEditorNavModule,
    MobileSidebarModule,
    TextEditorModule,
    NotFoundModule,
  ],
})
export class NotesModule {}
