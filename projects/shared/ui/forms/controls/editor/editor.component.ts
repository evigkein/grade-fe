// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
// import { TranslateModule } from '@ngx-translate/core';
// import { config } from 'rxjs';
// import { CustomControlAccessor } from '../../custom-control-accessor';
// import { editorConfig } from './editor-config';
//
// @Component({
//   selector: 'p-text-editor',
//   templateUrl: './editor.component.html',
//   styleUrls: ['./editor.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   standalone: true,
//   encapsulation: ViewEncapsulation.None,
//   imports: [CommonModule, ReactiveFormsModule, AngularEditorModule, HttpClientModule, TranslateModule]
// })
// export class EditorComponent extends CustomControlAccessor {
//   @Output() focusEvent = new EventEmitter<void>();
//   @Output() blurEvent = new EventEmitter<void>();
//   @Input() editMode = true;
//   @Input() editable = true;
//   @Input() placeholder = 'arts.create.editor-placeholder';
//   @Input() toolBarPosition: 'top' | 'bottom' = 'top';
//   @Input() showToolbar = true;
//   @Input() enableToolbar = true;
//   @Input() uploadUrl = editorConfig.uploadUrl;
//   @Input() toolbarHiddenButtons = editorConfig.toolbarHiddenButtons;
//
//   editorConfig: AngularEditorConfig = {
//     ...editorConfig,
//     editable: this.editable,
//     placeholder: this.placeholder,
//     toolbarPosition: this.toolBarPosition,
//     showToolbar: this.showToolbar,
//     enableToolbar: this.enableToolbar,
//     uploadUrl: this.uploadUrl,
//   };
//   override formControl = new FormControl('', {nonNullable: true});
//   protected readonly config = config;
// }
