import {
  AfterViewInit, booleanAttribute,
  Directive,
  ElementRef,
  EventEmitter,
  Input, numberAttribute,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { resizeObserver } from '../../../utils/helpers/browser/resize-observer.util';

export const WORD_BREAK_EXTRA_OFFSET = 20;
export const BREAK_WORD_EXCEPTION: RegExp = /[,(@#&+-]$/;

export function checkIsBreakWordException(string: string): boolean {
  return BREAK_WORD_EXCEPTION.test(string);
}

@Directive({ selector: '[autoEllipsis]', standalone: true })
export class AutoEllipsisDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input('autoEllipsis') autoEllipsis!: string;
  @Input() isLettersMode = false;
  @Input({transform: numberAttribute}) maxLines: number = Infinity;
  @Input({transform: booleanAttribute}) isShowFull = false;
  @Input({transform: booleanAttribute}) isHide = false;
  @Input({transform: booleanAttribute}) isFade = false;

  @Output() hiddenTextChanged = new EventEmitter<string>();
  @Output() linesChanged = new EventEmitter<string[]>();
  @Output() isOverflowed = new EventEmitter<void>();

  private displayedText!: string;
  private hiddenText!: string;
  private separatedPart: string | undefined = undefined;
  private resizeObserver!: ResizeObserver;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.updateState();
  }

  ngAfterViewInit() {
    this.initResizeObserver();
  }

  private getText(text: string, blockWidth: number): void {
    const wordsArray = text.split(' ');
    const wordsHiddenArray = wordsArray.slice();
    const rows: string[] = [];
    const textElement = this.createTestElement();
    let rowText = '';

    for (let i = 0; i <= wordsArray.length; i++) {
      const word = wordsArray[i] + ' ';
      if (this.isRowFull(rowText, word, textElement, blockWidth) || i === wordsArray.length) {
        rows.push(rowText.trim());
        rowText = '';

        if (rows.length === this.maxLines) {
          if (this.isFade) {
            rows[rows.length - 1] = rows[rows.length - 1] + wordsHiddenArray.join(' ');
          } else {
            rows[rows.length - 1] = this.trimExceptions(rows[rows.length - 1]) + '...';
          }

          if (wordsHiddenArray.length > 0) {
            this.isOverflowed.emit();
          }

          break;
        }
      }

      rowText += word;
      wordsHiddenArray.splice(0, 1);
    }

    this.displayedText = rows.join(' ');
    this.hiddenText = wordsHiddenArray.join(' ');
    this.linesChanged.emit(rows); // Эмитируем строки наружу
    this.renderer.removeChild(this.elementRef.nativeElement, textElement);
  }


  private getTextByLetters(text: string, blockWidth: number): void {
    const lettersArray = text.split('');
    const lettersHiddenArray = lettersArray.slice();
    const rows: string[] = [];
    const textElement = this.createTestElement();
    let rowText = '';

    for (let i = 0; i <= lettersArray.length; i++) {
      const letter = lettersArray[i];

      if (this.isRowFull(rowText, letter, textElement, blockWidth) || i === lettersArray.length) {
        const suffix =
          this.maxLines === 1 && (i !== lettersArray.length || lettersHiddenArray.length > 1) ? '...' : ' ';
        rows.push(rowText.trim() + suffix);
        rowText = '';
        if (rows.length === this.maxLines) {
          if (this.maxLines !== 1) {
            const rowIndex = rows.length - 1;
            rows[rowIndex] = this.trimExceptions(rows[rowIndex]).slice(0, rows.length - 5) + '...';
          }
          break;
        }
      }

      rowText += letter;
      lettersHiddenArray.shift();
    }

    this.displayedText = rows.join('');
    this.hiddenText = lettersHiddenArray.join('');
    this.linesChanged.emit(rows); // Эмитируем строки наружу
    this.renderer.removeChild(this.elementRef.nativeElement, textElement);
  }

  private isRowFull(currentText: string, nextWord: string, element: HTMLElement, blockWidth: number): boolean {
    const testText = currentText + nextWord;
    this.renderer.setProperty(element, 'textContent', testText);
    return element.clientWidth >= blockWidth;
  }

  private createTestElement(): HTMLElement {
    const element = this.renderer.createElement('span');
    this.renderer.setStyle(element, 'position', 'absolute');
    this.renderer.setStyle(element, 'left', '0');
    this.renderer.setStyle(element, 'top', '-9999px');
    this.renderer.setProperty(element, 'textContent', '');
    this.renderer.appendChild(this.elementRef.nativeElement, element);

    return element;
  }

  private trimExceptions(word: string): string {
    this.separatedPart = word[word.length - 1];
    return checkIsBreakWordException(word) ? word.slice(0, -1) : word;
  }

  private initResizeObserver(): void {
    const containerElement: HTMLElement = this.elementRef.nativeElement;
    this.resizeObserver = resizeObserver(containerElement, () => this.updateState())!;
  }

  private updateState(): void {
    if (this.isHide) {
      this.displayedText = '';
    } else {
      this.truncateText();
    }

    this.renderText();
  }

  private truncateText() {
    const extraOffset = this.isLettersMode && this.maxLines !== 1 ? 0 : WORD_BREAK_EXTRA_OFFSET;
    const containerWidth = this.elementRef.nativeElement.scrollWidth - extraOffset;
    if (this.autoEllipsis)
      this.isLettersMode ? this.getTextByLetters(this.autoEllipsis, containerWidth) : this.getText(this.autoEllipsis, containerWidth);
  }

  private renderText() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', this.displayedText);
    if (this.hiddenText) this.hiddenTextChanged.emit(this.hiddenText);
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
}
