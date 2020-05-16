import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '@app/shared/store/reducers';
import { NavigationsActions } from '@app/shared/store/actions';

@Component({
  selector: 'app-mobile-note-list',
  templateUrl: './mobile-note-list.component.html',
  styleUrls: ['./mobile-note-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('200ms', style({ transform: 'translateX(-100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class MobileNoteListComponent {
  isNoteListOpen$: Observable<boolean>;
  closeButtonStyles: {};
  noteListButtonStyles: {};
  addButtonStyles: {};

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.closeButtonStyles = {
      'border-left': '1px solid #e3e3e3',
      padding: '1rem',
      'border-radius': 0,
    };
    this.noteListButtonStyles = {
      'border-radius': 0,
      'text-align': 'left',
      padding: 0,
    };
    this.addButtonStyles = {
      'background-color': '#f2f2f2',
      color: '#000',
      'text-align': 'center',
      'border-radius': '2px',
      'font-size': '0.8rem',
      'justify-content': 'center',
    };
    this.isNoteListOpen$ = store.pipe(select(fromRoot.isNoteListOpen));
  }

  closeDialog(): void {
    this.store.dispatch(NavigationsActions.closeNoteList());
  }
}
