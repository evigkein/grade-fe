import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { ISimpleChanges } from '../../utils/types';

const markdownRegExpLink = /\[(.*?)\]\((.*?)\)(?:\s*{id=['"]?(.*?)['"]})?/g;

export interface IMarkdownClick<T = any> {
  url: string | null;
  id: T | null;
}

@Directive({selector: '[markdown]', standalone: true})
export class MarkdownLinkDirective implements OnInit, AfterViewInit, OnChanges {
  @Input({ required: true }) markdown!: string;
  @Output() actionM: EventEmitter<IMarkdownClick> = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateContent();
  }

  ngAfterViewInit() {
    this.addListeners();
  }

  ngOnChanges(changes: ISimpleChanges<MarkdownLinkDirective>) {
    if (changes.markdown) {
      this.updateContent();
      this.addListeners();
    }
  }

  private updateContent() {
    const htmlContent = this.markdown.replace(markdownRegExpLink, (match, text, url, id) => {
      return id ? `<a href="${url}" id="${id}">${text}</a>` : `<a href="${url}">${text}</a>`;
    });
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', htmlContent);
  }

  private addListeners() {
    const element = this.el.nativeElement;

    if (element) {
      const links = element.querySelectorAll('a');

      links.forEach((link: HTMLAnchorElement) => {
        const id = link.getAttribute('id') || link.textContent;
        const url = link.getAttribute('href');

        // Удаление старых обработчиков событий, если они существуют
        this.renderer.listen(link, 'click', (event) => {
          event.preventDefault();
          this.actionM.emit({ url, id });
        });
      });
    }
  }
}

