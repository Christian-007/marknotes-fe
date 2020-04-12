import { Component, OnInit } from '@angular/core';

import { MarkdownParser } from '../../services/markdown-parser/markdown-parser';
import { MarkdownState } from '../../services/store/markdown-state.model';
import { MarkdownStore } from '../../services/store/markdown.store';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  constructor(
    private markdownParser: MarkdownParser,
    private markdownStore: MarkdownStore<MarkdownState>,
  ) {}

  ngOnInit() {}

  onClickPreview(): void {
    const { markdownText } = this.markdownStore.state;
    const parsedMarkdownText = this.markdownParser.convert(markdownText);

    this.markdownStore.setHtmlText(parsedMarkdownText);
  }
}
