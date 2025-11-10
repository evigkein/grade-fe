import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({selector: '[ngUnless]', standalone: true})
export class UnlessDirective {

    private hasView = false;

    @Input() set ngUnless(condition: boolean | undefined) {
        if (!condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (condition && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }

    /** Конструктор директивы */
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

}
