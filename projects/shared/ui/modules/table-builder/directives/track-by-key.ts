import {
  Directive,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
  DoCheck,
  TrackByFunction
} from '@angular/core';

export interface NgForTrackByKeyContext<T> {
  $implicit: T;
  index: number;
  count: number;
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[ngForTrackByKey]', standalone: true })
export class NgForTrackByKeyDirective<T> implements DoCheck, OnChanges {
  private items: T[] | null | undefined = null;
  private differ: IterableDiffer<T> | null = null;
  private trackByKey: keyof T | null = null;
  private trackByFn: TrackByFunction<T>;

  private readonly templateRef = inject(TemplateRef<NgForTrackByKeyContext<T>> as any);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly iterableDiffers = inject(IterableDiffers);

  constructor() {
    this.trackByFn = (index: number, item: T) => {
      return this.trackByKey ? item[this.trackByKey] : item;
    };
  }

  @Input('ngForOf')
  set ngForOf(items: T[] | null | undefined) {
    this.items = items;
    if (!this.differ && this.items) {
      this.differ = this.iterableDiffers.find(this.items).create(this.trackByFn);
    }
  }

  @Input('ngForTrackByKey')
  set ngForTrackByKey(key: keyof T) {
    if (this.trackByKey !== key) {
      this.trackByKey = key;
      if (this.items) {
        this.differ = this.iterableDiffers.find(this.items).create(this.trackByFn);
      }
    }
  }

  static ngTemplateContextGuard<T>(
    dir: NgForTrackByKeyDirective<T>,
    ctx: any
  ): ctx is NgForTrackByKeyContext<T> {
    return true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('ngForOf' in changes) {
      const value = changes['ngForOf'].currentValue;
      if (!value) {
        this.viewContainer.clear();
        this.differ = null;
      }
    }
  }

  ngDoCheck(): void {
    if (this.differ && this.items) {
      const changes = this.differ.diff(this.items);
      if (changes) {
        this.applyChanges(changes);
      }
    }
  }

  private applyChanges(changes: any): void {
    const recordViewTuples: any[] = [];
    changes.forEachRemovedItem((record: any) => recordViewTuples.push({ record, view: this.viewContainer.get(record.previousIndex) }));

    recordViewTuples.forEach(item => this.viewContainer.remove(this.viewContainer.indexOf(item.view)));

    changes.forEachAddedItem((record: any) => {
      const view = this.viewContainer.createEmbeddedView(
        this.templateRef as any,
        { $implicit: record.item, index: -1, count: -1 },
        record.currentIndex
      );
      recordViewTuples.push({ record, view });
    });

    for (let i = 0; i < this.viewContainer.length; i++) {
      const view = this.viewContainer.get(i) as any;
      view.context.index = i;
      view.context.count = this.viewContainer.length;
    }
  }
}
