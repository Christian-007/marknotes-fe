import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '@app/shared/store/reducers';
import { NavigationsActions, NotesActions } from '@app/shared/store/actions';
import { INote } from '@app/shared/models/markdown-state.model';
import {
  DynamicItem,
  ClickedItemData,
} from '@app/shared/models/dynamic-component.model';
import { generateRandomId } from '@app/shared/utils/generator.util';
import { DialogComponent } from '../dialog/dialog.component';
import { Click } from '@app/shared/enums/ui-actions.enum';

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

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickPreview(): void {
    this.store.dispatch(NavigationsActions.togglePreview());
  }

  onSubmitEdit(updatedNoteTitle: string): void {
    const update: Partial<INote> = {
      title: updatedNoteTitle,
    };
    this.store.dispatch(NotesActions.updateNote({ payload: update }));
  }

  onClickDelete(): void {
    const payload = this.createDynamicItem();
    this.store.dispatch(NavigationsActions.buildComponent({ payload }));
  }

  private createDynamicItem(): DynamicItem {
    return {
      component: DialogComponent,
      data: {
        id: generateRandomId(),
      },
      onAction: (emittedValues: ClickedItemData) => {
        const { id, type } = emittedValues;
        if (type === Click.Cancel) {
          console.log('Cancelling ', id);
        } else {
          console.log('Success ', id);
        }
      },
    };
  }
}
