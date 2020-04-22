import { SafeHtml } from '@angular/platform-browser';

import { Store } from './store';
import { Toolbar } from '../../enums/toolbars.enum';
import { MarkdownState, INote } from './markdown-state.model';
import { generateRandomId } from '../../utils/generator.util';

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

  createNote(): void {
    const defaultNote: INote = {
      id: generateRandomId(),
      markdownText: '',
      htmlText: '',
      title: 'Untitled Note',
      dateCreated: Date.now(),
    };

    this.setState({
      ...this.state,
      notes: [...this.state.notes, defaultNote],
      currentActiveNote: defaultNote,
    });
  }

  updateNote(addedNote: INote): void {
    this.setState({
      ...this.state,
      notes: this.overwriteNote(addedNote),
    });
  }

  private overwriteNote(addedNote: INote): INote[] {
    return this.state.notes.map((note: INote) => {
      // Edit the matched note
      if (note.id === addedNote.id) {
        return {
          ...note,
          ...addedNote,
        };
      }

      // Otherwise, return the existing note
      return note;
    });
  }
}
