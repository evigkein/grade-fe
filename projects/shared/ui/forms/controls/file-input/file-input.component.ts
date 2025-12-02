import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  signal,
  ViewChild
} from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { deepClone, destroy, ISimpleChanges, sizeToBytes } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BytesToSizePipe } from '../../../../pipes/bites-to-size.pipe';
import { SafeHtmlPipe } from '../../../../pipes/sanitize/safe-html.pipe';
import { ButtonComponent } from '../../../components/button/button.component';
import { FadeTextComponent } from '../../../components/fade-text/fade-text.component';
import { TooltipHelpComponent } from '../../../components/features/tooltip/tooltip-help/tooltip-help.component';
import { CustomImageDirective } from '../../../directives/ui/img/priority.directive';
import { StopPropagationDirective } from '../../../directives/utils';
import { BytesToSizePipe } from '../../../pipes/bites-to-size.pipe';
import { SafeHtmlPipe } from '../../../pipes/sanitize/safe-html.pipe';
import { _DEVICE } from '../../../services/device/device.service';
import { ButtonComponent } from '../../../ui/components/button/button.component';
import { FadeTextComponent } from '../../../ui/components/fade-text';
import { TooltipHelpComponent } from '../../../ui/components/features/tooltip/tooltip-help/tooltip-help.component';
import { SvgIconComponent } from '../../../ui/modules/svg-icon/svg-icon.component';
import { OpenCloseAnimation } from '../../../utils/animation/slide-in-out.animation';
import { DndDirective } from './dnd.directive';

function isTheSameFiles(file1: File, file2: File) {
  return (
    file1?.lastModified === file2?.lastModified &&
    file1?.name === file2?.name &&
    file1?.size === file2?.size &&
    file1?.type === file2?.type
  );
}

const extensionRegExp = /(?:\.([^.]+))?$/;

export interface IFileErrors {
  type: string;
  maxAmount?: string;
  fileExtension?: string;
  allowedExtensions?: string;
  fileName?: string;
  maxSize?: string;
}


// <ims-file-input #fileUpload
//   [formArray]="files"
//   [validators]="validators"
//   [maxAmount]="1"
//   [text]="'text'"
//   ></admin-file-input>

//  files = new FormArray([])
@Component({
  selector: 'p-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [OpenCloseAnimation],
  imports: [CommonModule, ReactiveFormsModule, BytesToSizePipe, ButtonComponent, SvgIconComponent, DndDirective, SafeHtmlPipe, TranslateModule, FadeTextComponent, TooltipHelpComponent, CustomImageDirective, StopPropagationDirective, ButtonComponent, TooltipHelpComponent, SafeHtmlPipe, BytesToSizePipe, FadeTextComponent, BytesToSizePipe]
})
export class FileInputComponent implements OnInit, OnChanges {
  @Input() text = 'file-input.drag';
  @Input() extensions: string[] = ['jpeg', 'png', 'jpg', 'heic', 'webp'];
  // @Input() extensions: string[] = ['jpeg', 'png', 'jpg'];
  @Input() maxSize: string = '10mb';
  @Input() currentImageSrc = '';
  @Input({transform: numberAttribute}) maxAmount = 10;
  @Input({transform: booleanAttribute}) isMulti = false;
  @Input({transform: booleanAttribute}) hasIcon = false;
  @Input({transform: booleanAttribute}) hasTooltip = false;
  @Input({transform: booleanAttribute}) isRow = false;
  @Input({transform: booleanAttribute}) isPicOnly = true;
  @Input() tooltip: string = '';
  @Input() formArray: FormArray = new FormArray<any>([]);
  @Output() uploaded = new EventEmitter<FileList>();
  @Output() imageChangedEvent = new EventEmitter<Event>();

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileDrop') fileDrop!: ElementRef<HTMLElement>;

  isMobileOrTablet = _DEVICE().isMobileOrTablet;

  tooltipExts!: string;

  errors = signal<IFileErrors[]>([]);
  destroy$ = destroy();

  fileNameDoubleCounter: { [key: string]: number } = {};
  drop$ = new Subject();

  constructor(private r: Renderer2, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initFormArray();

    const exts = deepClone(this.extensions);
    exts[0] = '.' + exts[0];
    this.tooltipExts = exts.join(' .');
  }

  ngOnChanges(changes: ISimpleChanges<FileInputComponent>) {
    if (changes.errors && !changes.errors.firstChange) {
      this.cdr.detectChanges();
    }
  }

  dropFile(files: FileList, e: Event): void {
    const event = {target: { files }} as unknown as Event;
    this.imageChangedEvent.emit(event)
    console.log(e, 'EEE');
    this.checkValidity(files);
  }

  onFileChanged(e: any): void {
    this.checkValidity(e.target.files);
    this.imageChangedEvent.emit(e);
  }

  triggerFileInputClick(): void {
    if (!this.currentImageSrc && this.hasIcon) this.fileInput.nativeElement.click();
  }

  checkValidity(fileList: FileList): void {
    const files = Array.from(fileList);
    const maxSizeInBytes = sizeToBytes(this.maxSize);

    const errors: IFileErrors[] = getErrors(files, this.maxAmount, this.extensions, maxSizeInBytes, this.formArray.controls.length);
    this.errors.set(errors);

    if (errors.length) {
      return;
    }

    this.updateFormArray(files);
  }

  removeFile(index: number): void {
    delete this.fileNameDoubleCounter[this.formArray.controls[index].value.name];
    this.formArray.removeAt(index);
  }

  clearAllFiles(): void {
    this.formArray.reset([]);
    this.fileNameDoubleCounter = {};
    this.errors.set([]);
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  removeCurrentImage(): void {
    // this.currentImageSrc = '';
    // this.cdr.detectChanges();
  }

  private initFormArray(): void {
    this.formArray.valueChanges
      .pipe(
        debounceTime(300),
        this.destroy$(),
      )
      .subscribe(files => {
        console.log(files);
        this.uploaded.emit(files);
        // this.formArray.length === 0 && this.clearAllFiles();
        this.cdr.detectChanges();
      });
  }

  private updateFormArray(uploadedFiles: File[] = []): boolean | void {
    uploadedFiles = uploadedFiles.filter((file) => {
      return !this.formArray.controls.filter((control) =>
        isTheSameFiles(control.value, file)
      ).length;
    });

    uploadedFiles.forEach((file) => {
      if (this.fileNameDoubleCounter[file.name] === undefined) {
        this.fileNameDoubleCounter[file.name] = 0;
      } else {
        this.fileNameDoubleCounter[file.name]++;

        const extension = extensionRegExp.exec(file.name)![1];
        const filename = file.name.replace(`.${extension}`, '');
        file = new File(
          [file],
          `${filename} (${this.fileNameDoubleCounter[file.name]}).${extension}`,
          {
            lastModified: file.lastModified,
            type: file.type
          }
        );
      }

      this.formArray.push(new FormControl(file));
    });
  }
}

function getErrors(files: File[], maxAmount: number, extensions: string[], maxSizeInBytes: number, formArrayLength: number): IFileErrors[] {
  const errors: IFileErrors[] = [];

  if (formArrayLength + files.length > maxAmount) {
    errors.push({
      type: 'maxAmount',
      maxAmount: maxAmount.toString()
    });
  }

  files.forEach(file => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const fileSize = file.size;

    if (!extensions.includes(fileExtension!)) {
      errors.push({
        type: 'invalidExtension',
        fileExtension: fileExtension!,
        allowedExtensions: extensions.join(', ')
      });
    }

    if (fileSize > maxSizeInBytes) {
      errors.push({
        type: 'maxSize',
        fileName: file.name,
        maxSize: maxSizeInBytes.toString()
      });
    }
  });

  return errors;
}
