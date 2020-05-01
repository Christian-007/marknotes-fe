import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from 'src/app/pages/notes/shared/reducers';
import { NavigationsActions } from 'src/app/pages/notes/shared/actions';
import { INote } from 'src/app/shared/services/store/markdown-state.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  isPreview$: Observable<boolean>;
  activeNote$: Observable<INote>;

  constructor(private store: Store<fromRoot.ApplicationState>) {
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
    this.activeNote$ = store.pipe(select(fromRoot.selectActiveNote));
  }

  ngOnInit() {}

  onClickPreview(): void {
    this.store.dispatch(NavigationsActions.togglePreview());
  }
}
