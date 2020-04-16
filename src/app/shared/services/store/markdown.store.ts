import { SafeHtml } from '@angular/platform-browser';

import { Store } from './store';
import { Toolbar } from '../../enums/toolbars.enum';
import { MarkdownState } from './markdown-state.model';

export class MarkdownStore extends Store<MarkdownState> {
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

  setChecked(featureName: Toolbar, value: boolean): void {
    this.setState({
      ...this.state,
      checked: {
        ...this.state.checked,
        [featureName]: value,
      },
    });
  }
}
