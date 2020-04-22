import { Component, OnInit } from '@angular/core';

import { MarkdownParser } from '../../services/markdown-parser/markdown-parser';
import { MarkdownStore } from '../../services/store/markdown.store';
import { MarkdownState } from '../../services/store/markdown-state.model';
import { Toolbar } from '../../enums/toolbars.enum';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  isPreview: boolean;

  constructor(
    private markdownParser: MarkdownParser,
    private markdownStore: MarkdownStore,
  ) {
    this.isPreview = false;
  }

  ngOnInit() {
    this.markdownStore.state$.subscribe((state: MarkdownState) => {
      this.isPreview = state.checked[Toolbar.Preview];
    });
  }

  onClickPreview(isChecked: boolean): void {
    const { markdownText } = this.markdownStore.state;
    const parsedMarkdownText = this.markdownParser.convert(markdownText);

    this.markdownStore.setHtmlText(parsedMarkdownText);
    this.markdownStore.setChecked(Toolbar.Preview, isChecked);
  }
}
