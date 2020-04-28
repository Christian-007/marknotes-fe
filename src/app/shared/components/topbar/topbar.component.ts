import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { MarkdownParser } from '../../services/markdown-parser/markdown-parser';
import { INote } from '../../services/store/markdown-state.model';
import * as fromRoot from 'src/app/pages/notes/shared/reducers';
import { NavigationsActions } from 'src/app/pages/notes/shared/actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  isPreview$: Observable<boolean>;
  note$: Observable<INote>;

  constructor(
    private markdownParser: MarkdownParser,
    private store: Store<fromRoot.ApplicationState>,
  ) {
    this.isPreview$ = store.pipe(select(fromRoot.selectIsPreview));
  }

  ngOnInit() {}

  onClickPreview(isChecked: boolean): void {
    this.note$ = this.store.pipe(select(fromRoot.selectActiveNote), take(1));

    if (isChecked) {
      // ? Isolate this in Effect()
      this.note$.subscribe(note => {
        const parsedMarkdownText = this.markdownParser.convert(
          note.markdownText,
        );

        const update = {
          payload: { id: note.id, changes: { htmlText: parsedMarkdownText } },
        };

        this.store.dispatch(NavigationsActions.previewNote(update));
      });
    } else {
      this.store.dispatch(NavigationsActions.showEditor());
    }
  }
}
