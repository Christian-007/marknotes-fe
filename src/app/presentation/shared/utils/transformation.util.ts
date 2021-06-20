import { INote } from '@app/presentation/shared/models/markdown-state.model';

export class TransformationUtil {
  static combineTitleWithBody(note: INote): string {
    const { title, markdownText } = note;
    const transformTitleToMarkdown = `# ${title}\n`;

    return transformTitleToMarkdown + markdownText;
  }
}
