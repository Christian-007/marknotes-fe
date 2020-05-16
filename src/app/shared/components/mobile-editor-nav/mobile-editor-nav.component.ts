import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/shared/store/reducers';
import { NavigationsActions } from '@app/shared/store/actions';

@Component({
  selector: 'app-mobile-editor-nav',
  templateUrl: './mobile-editor-nav.component.html',
  styleUrls: ['./mobile-editor-nav.component.scss'],
})
export class MobileEditorNavComponent implements OnInit {
  optionButtonStyles: {};
  menuBarStyles: {};

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.optionButtonStyles = {
      border: '1px solid #e3e3e3',
      padding: '4px',
    };
    this.menuBarStyles = {
      padding: '0 0.3rem 0 0',
    };
  }

  ngOnInit() {}

  onClickOption(): void {
    this.store.dispatch(NavigationsActions.openNoteList());
  }
}
