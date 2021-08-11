export abstract class CodeHighlighter {
  abstract highlight(code: string, language: string): string;
}
