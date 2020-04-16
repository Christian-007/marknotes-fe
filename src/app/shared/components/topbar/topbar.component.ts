import { Component } from '@angular/core';

import { MarkdownParser } from '../../services/markdown-parser/markdown-parser';
import { MarkdownStore } from '../../services/store/markdown.store';
import { Toolbar } from '../../enums/toolbars.enum';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  constructor(
    private markdownParser: MarkdownParser,
    private markdownStore: MarkdownStore,
  ) {}

  onClickPreview(isChecked: boolean): void {
    const { markdownText } = this.markdownStore.state;
    const parsedMarkdownText = this.markdownParser.convert(markdownText);

    this.markdownStore.setHtmlText(parsedMarkdownText);
    this.markdownStore.setChecked(Toolbar.Preview, isChecked);
  }
}
