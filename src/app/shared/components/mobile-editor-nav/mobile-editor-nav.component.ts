import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '@app/shared/store/reducers';
import { NavigationsActions, NotesActions } from '@app/shared/store/actions';
import { ComponentCreator } from '@app/shared/services/component-creator/component-creator';
import {
  DynamicItemRef,
  ClickedItemData,
} from '@app/shared/models/dynamic-component.model';
import { ToolbarDialogComponent } from '../toolbar-dialog/toolbar-dialog.component';
import { generateRandomId } from '@app/shared/utils/generator.util';
import { Click, Toolbar } from '@app/shared/enums/ui-actions.enum';
import { INote } from '@app/shared/models/markdown-state.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-mobile-editor-nav',
  templateUrl: './mobile-editor-nav.component.html',
  styleUrls: ['./mobile-editor-nav.component.scss'],
})
export class MobileEditorNavComponent implements OnInit {
  activeNote$: Observable<INote>;
  activeNote: INote;
  subscription: Subscription;
  optionButtonStyles: {};
  menuBarStyles: {};

  constructor(
    private store: Store<fromRoot.ApplicationState>,
    private componentCreator: ComponentCreator,
  ) {
    this.optionButtonStyles = {
      border: '1px solid #e3e3e3',
      padding: '4px',
    };
    this.menuBarStyles = {
      padding: '0 0.3rem 0 0',
    };
    this.activeNote$ = store.pipe(select(fromRoot.selectActiveNote));
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(
      this.activeNote$.subscribe(note => {
        this.activeNote = note;
      }),
    );
  }

  onClickMenu(): void {
    this.store.dispatch(NavigationsActions.openNoteList());
  }

  onClickOption(): void {
    const toolbarDialogData = this.createToolbarDialogData();
    const createdComponent = this.componentCreator.build(toolbarDialogData);
    this.componentCreator.insert(createdComponent);
  }

  private createToolbarDialogData(): DynamicItemRef {
    return {
      component: ToolbarDialogComponent,
      data: {
        id: generateRandomId(),
      },
      onAction: (emittedValues: ClickedItemData) =>
        this.toolbarDialogActions(emittedValues),
    };
  }

  private toolbarDialogActions(emittedValues: ClickedItemData) {
    const { id, type } = emittedValues;

    switch (type) {
      case Toolbar.Preview:
        this.store.dispatch(NavigationsActions.togglePreview());
        this.componentCreator.destroy(id);
        break;

      case Toolbar.Save:
        this.store.dispatch(
          NotesActions.saveOneNote({ payload: this.activeNote }),
        );
        this.componentCreator.destroy(id);
        break;

      case Toolbar.Delete:
        this.componentCreator.destroy(id);
        const deleteDialogData = this.createDeleteDialogData();
        const createdComponent = this.componentCreator.build(deleteDialogData);
        this.componentCreator.insert(createdComponent);
        break;

      default:
        this.componentCreator.destroy(id);
    }
  }

  private createDeleteDialogData(): DynamicItemRef {
    return {
      component: DialogComponent,
      data: {
        id: generateRandomId(),
        title: this.activeNote.title,
      },
      onAction: (emittedValues: ClickedItemData) =>
        this.deleteDialogActions(emittedValues),
    };
  }

  private deleteDialogActions(emittedValues: ClickedItemData): void {
    const { id, type } = emittedValues;
    if (type === Click.Success) {
      this.store.dispatch(
        NotesActions.deleteNote({
          noteId: this.activeNote.id,
          componentId: id,
        }),
      );
    } else {
      this.componentCreator.destroy(id);
    }
  }
}
