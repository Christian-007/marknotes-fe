import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  styleUrls: ['./text-editor.component.scss'],
  template: `
    <div
      #textEditor
      class="outline-none font-mono text-xs pb-4"
      contenteditable="true"
      tabindex="1"
      role="textarea"
      [attr.data-placeholder]="placeholder"
      (blur)="onTouched()"
      (input)="onChange($event.target.innerText)"
    ></div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true,
    },
  ],
})
export class TextEditorComponent implements ControlValueAccessor {
  @Input() placeholder: string;

  @ViewChild('textEditor', { read: ElementRef, static: true })
  textEditor: ElementRef;

  onChange: (value: string) => void;
  onTouched: () => void;
  private isDisabled: boolean;

  constructor(private renderer: Renderer2) {
    this.placeholder = '';
    this.isDisabled = false;
  }

  writeValue(value: any): void {
    const textEditorElement: HTMLDivElement = this.textEditor.nativeElement;
    this.renderer.setProperty(textEditorElement, 'innerText', value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.toggleDisabledProperty();
  }

  private toggleDisabledProperty(): void {
    const textEditorElement: HTMLDivElement = this.textEditor.nativeElement;
    const addOrRemoveClass = this.isDisabled ? 'addClass' : 'removeClass';

    this.renderer[addOrRemoveClass](textEditorElement, 'disabled');
  }
}
