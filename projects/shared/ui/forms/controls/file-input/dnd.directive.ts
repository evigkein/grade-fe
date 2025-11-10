import {
  Directive,
  Output,
  Input,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

export interface IDndEvent { files: FileList, originalEvent: DragEvent };
@Directive({selector: '[dnd]', standalone: true})
export class DndDirective {
  @HostBinding('class.is-dragover') fileOver = false;
  @Output() fileDropped = new EventEmitter<IDndEvent>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer?.files;
    if (files?.length) {
      this.fileDropped.emit({ files, originalEvent: evt });
    }
  }
}
