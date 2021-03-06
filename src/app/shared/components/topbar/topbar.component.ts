import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Update } from '@ngrx/entity';

import * as fromRoot from '@app/shared/store/reducers';
import { NavigationsActions, NotesActions } from '@app/shared/store/actions';
import { INote } from '@app/shared/models/markdown-state.model';
import {
  DynamicItemRef,
  ClickedItemData,
} from '@app/shared/models/dynamic-component.model';
import { generateRandomId } from '@app/shared/utils/generator.util';
import { DialogComponent } from '../dialog/dialog.component';
import { Click } from '@app/shared/enums/ui-actions.enum';
import { ComponentCreator } from '@app/shared/services/component-creator/component-creator';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  isPreview$: Observable<boolean>;
  activeNote$: Observable<INote>;
  activeNote: INote;
  subscription: Subscription;
  hasNotesInStorage$: Observable<boolean>;
  isEditingTitle$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.ApplicationState>,
    private componentCreator: ComponentCreator,
  ) {
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
    this.activeNote$ = store.pipe(select(fromRoot.selectActiveNote));
    this.hasNotesInStorage$ = store.pipe(select(fromRoot.hasNotesInStorage));
    this.isEditingTitle$ = store.pipe(select(fromRoot.isEditingTitle));
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(
      this.activeNote$.subscribe(note => {
        this.activeNote = note;
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickPreview(): void {
    this.store.dispatch(NavigationsActions.togglePreview());
  }

  onSubmitEdit(updatedNoteTitle: string): void {
    const payload: Update<INote> = {
      id: this.activeNote.id,
      changes: {
        title: updatedNoteTitle,
      },
    };
    this.store.dispatch(NavigationsActions.submitNoteTitle({ payload }));
  }

  onClickSave(): void {
    this.store.dispatch(NotesActions.saveNote({ payload: this.activeNote }));
  }

  onClickDelete(): void {
    const payload = this.createDynamicItem();
    const createdComponent = this.componentCreator.build(payload);
    this.componentCreator.insert(createdComponent);
  }

  onEditTitle(isEditingTitle: boolean): void {
    this.store.dispatch(NavigationsActions.clickEditTitle({ isEditingTitle }));
  }

  private createDynamicItem(): DynamicItemRef {
    return {
      component: DialogComponent,
      data: {
        id: generateRandomId(),
        title: this.activeNote.title,
      },
      onAction: (emittedValues: ClickedItemData) => {
        const { id, type } = emittedValues;
        if (type === Click.Cancel) {
          this.componentCreator.destroy(id);
        } else {
          this.store.dispatch(
            NotesActions.deleteNote({
              noteId: this.activeNote.id,
              componentId: id,
            }),
          );
        }
      },
    };
  }
}
