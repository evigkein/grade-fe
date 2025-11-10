
```html
<ng-template #modal>
  <p-modal
    [id]="removeModalId()"
    titleText="remove-confirmation"
    submitButtonText="remove"
    cancelButtonText="cancel"
    submitButtonType="warn"
    cancelButtonType="primary"
    [iconClose]="true"
    [isFlexibleWidth]="false"
    [isMobileFullScreen]="true"
    (submit)="onRemove()">
    <div class="confirm-content">
      <p class="p-p4 p-text-center">{{'review.remove-confirm' | translate}}</p>
    </div>
  </p-modal>
</ng-template>
```

```ts
@ViewChild('modal') public modalRef!: TemplateRef<ElementRef>;
modalId = signal<string>(null!);
modal = _MODAL();

handleModal(isOpen = false): void {
  if(isOpen && this.modalId()) return;
if(!isOpen) {
  this.modal.closeModal(this.modalId())
  this.modalId.set(null!);
} else {
  const modalId = this.modal.openModal({templateRef: this.setPercentModalRef})!;
  this.modalId.set(modalId);
}
}




openModal(isClose?: boolean): void {
  if(isClose) {
    this.modal.closeModal(this.modalId())
    this.modalId.set(null!);
  }
  const modalId = this.modal.openModal({templateRef: this.modalRef})!;
  this.modalId.set(modalId);
}

openModal(isClose = false, item?: ITask): void {
  if(isClose) {
    this.modal.closeModal(this.modalId())
    this.modalId.set(null!);
    this.currentTask.set(null!)
  }
  this.currentTask.set(item);
  const modalId = this.modal.openModal({templateRef: this.modalRef})!;
  this.modalId.set(modalId);
}


openModal(item?: ITask): void {
  if(item) {
    const modalId = this.modal.openModal({templateRef: this.modalRef})!;
    this.modalId.set(modalId);
  } else {
    this.modal.closeModal(this.modalId())
    this.modalId.set(null!);
  }
}




openRemoveModal(): void {
  const modalId = this.modal.openModal({templateRef: this.modalRef})!;
  this.removeModalId.set(modalId);
}

this.modal.closeModal(this.removeModalId());
```



```ts
  cancel(): void {}
  submit(): void {}
```
