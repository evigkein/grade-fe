Достаточно просто передать содержимое внутрь и модалка готова

``` angular20html
    <p-modal-wrapper
      [titleText]="titleText()"
      [submitButtonText]="buttonText()"
      (submit)="close()">
      <div class="confirm-content p-text-center">
        <p class="p-p4">{{ subTitle() | translate }}</p>
      </div>
    </p-modal-wrapper>
```
