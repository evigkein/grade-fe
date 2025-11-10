import {
    ApplicationRef,
    booleanAttribute,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Injector,
    Input,
    numberAttribute
} from '@angular/core';
import { destroy } from '../../../utils/libs/rxjs';
import { TooltipComponent } from './tooltip.component';
import { TooltipPosition, TooltipTheme } from './tooltip.enums';
import { fromEvent } from 'rxjs';

@Directive({ selector: '[tooltip]', standalone: true })
export class TooltipDirective {
    @Input() tooltip = '';
    @Input() position: TooltipPosition = TooltipPosition.DEFAULT;
    @Input() theme: TooltipTheme = TooltipTheme.DEFAULT;
    @Input({ transform: numberAttribute }) showDelay = 0;
    @Input({ transform: numberAttribute }) hideDelay = 0;
    @Input({ transform: booleanAttribute }) keepWhenHovered = true;

    private componentRef: ComponentRef<any> | null = null;
    private showTimeout?: number;
    private hideTimeout?: number;
    private touchTimeout?: number;
    private destroy$ = destroy();


    constructor(private elementRef: ElementRef, private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector
    ) {
    }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.initializeTooltip();
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        if (!this.keepWhenHovered) {
            this.setHideTooltipTimeout();
        }
        this.setHideTooltipTimeout();
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove($event: MouseEvent): void {
        if (this.componentRef !== null && this.position === TooltipPosition.DYNAMIC) {
            this.componentRef.instance.left = $event.clientX;
            this.componentRef.instance.top = $event.clientY;
            this.componentRef.instance.tooltip = this.tooltip;
        }
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart($event: TouchEvent): void {
        $event.preventDefault();
        window.clearTimeout(this.touchTimeout);
        this.touchTimeout = window.setTimeout(this.initializeTooltip.bind(this), 500);
    }

    @HostListener('touchend')
    onTouchEnd(): void {
        window.clearTimeout(this.touchTimeout);
        this.setHideTooltipTimeout();
    }

    private initializeTooltip() {
        if (this.componentRef === null) {
            window.clearInterval(this.hideDelay);
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
            this.componentRef = componentFactory.create(this.injector);

            this.appRef.attachView(this.componentRef.hostView);
            const [tooltipDOMElement] = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes;

            this.init();

            document.body.appendChild(tooltipDOMElement);
            this.showTimeout = window.setTimeout(this.showTooltip.bind(this), this.showDelay);
        }
    }

    private init() {
        if (this.componentRef !== null) {
            this.initKeepTooltip(this.componentRef);
            this.initSettings(this.componentRef)
        }
    }

    private showTooltip() {
        if (this.componentRef !== null) {
            this.componentRef.instance.visible = true;
        }
    }

    private setHideTooltipTimeout() {
        window.clearTimeout(this.hideTimeout);
        this.hideTimeout = window.setTimeout(this.destroy.bind(this), this.hideDelay);
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    destroy(): void {
        if (this.componentRef !== null) {
            window.clearInterval(this.showTimeout);
            window.clearInterval(this.hideDelay);
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

    private initKeepTooltip(componentRef: ComponentRef<any>): void {
        const [tooltipDOMElement] = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes;

        fromEvent(tooltipDOMElement, 'mouseenter')
            .pipe((this.destroy$()))
            .subscribe(() => {
                this.keepWhenHovered = true;
                window.clearTimeout(this.hideTimeout);
            });

        fromEvent(tooltipDOMElement, 'mouseleave')
            .pipe((this.destroy$()))
            .subscribe(() => {
                this.keepWhenHovered = false;
                this.setHideTooltipTimeout();
            });
    }

    private initSettings(componentRef: ComponentRef<any>): void {
        componentRef.instance.tooltip = this.tooltip;
        componentRef.instance.position = this.position;
        componentRef.instance.theme = this.theme;

        const { left, right, top, bottom } = this.elementRef.nativeElement.getBoundingClientRect();

        switch (this.position) {
            case TooltipPosition.BELOW: {
                componentRef.instance.left = Math.round((right - left) / 2 + left);
                componentRef.instance.top = Math.round(bottom);
                break;
            }
            case TooltipPosition.ABOVE: {
                componentRef.instance.left = Math.round((right - left) / 2 + left);
                componentRef.instance.top = Math.round(top);
                break;
            }
            case TooltipPosition.RIGHT: {
                componentRef.instance.left = Math.round(right);
                componentRef.instance.top = Math.round(top + (bottom - top) / 2);
                break;
            }
            case TooltipPosition.LEFT: {
                componentRef.instance.left = Math.round(left);
                componentRef.instance.top = Math.round(top + (bottom - top) / 2);
                break;
            }
            default: {
                break;
            }
        }
    }
}
