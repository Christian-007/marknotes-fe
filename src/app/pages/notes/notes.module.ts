import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NoteDetailsComponent } from './note-details/note-details.component';
import { NotesComponent } from './notes.component';
import { routes } from './router';

import { TopbarModule } from '@app/shared/components/topbar/topbar.module';
import { SidebarModule } from '@app/shared/components/sidebar/sidebar.module';
import { MobileEditorNavModule } from '@app/shared/components/mobile-editor-nav/mobile-editor-nav.module';
import { MobileSidebarModule } from '@app/shared/components/mobile-sidebar/mobile-sidebar.module';
import { TextEditorModule } from '@app/shared/components/text-editor/text-editor.module';

@NgModule({
  declarations: [NotesComponent, NoteDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    TopbarModule,
    SidebarModule,
    MobileEditorNavModule,
    MobileSidebarModule,
    TextEditorModule,
  ],
})
export class NotesModule {}
