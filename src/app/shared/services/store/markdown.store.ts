import { SafeHtml } from '@angular/platform-browser';

import { Store } from './store';

export class MarkdownStore<T> extends Store<T> {
  setMarkdownText(value: string): void {
    this.setState({
      ...this.state,
      markdownText: value,
    });
  }

  setHtmlText(value: SafeHtml): void {
    this.setState({
      ...this.state,
      htmlText: value,
    });
  }
}
