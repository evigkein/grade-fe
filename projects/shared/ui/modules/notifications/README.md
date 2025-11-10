## Notifications`

```ts
export class PageCreateDepositRequestComponent {
  constructor(
    private notificationService: NotificationService,
  ) { }

  notify() {
    this.notificationService.notify(DepositNotificationComponent, {
      data: {
        title: title,
        description: description,
        linkUrl: ['/niceurl/page'],
        linkParams: {applicationId: ${this.courses.id}},
        linkLabel: 'Details'
      }
    });
  }
}
```

`notify()` accepts:

1. component (import module with component to current module)
2. config:

`title`, `description`, `duration` => duration === 0 ? will never close : time

```ts
export class DepositNotificationComponent {
  @Input() config: {
    title: string
    description: string
    linkUrl?: string[]
    linkLabel?: string
    linkParams?: {}
  }
}
```

## Basic template

```html
<ds-notification-template
  [svg]="{name: 'icon', width: '33px', height: '33px'}"
  [title]="config.title"
  [description]="config.description"
>
</ds-notification-template>
```

Params:

- `[svg]` - export interface SvgConfig { name: string width: string height: string}
- `[title]` - (accepts HTML)
- `[description]` - (accepts HTML)
- `[linkUrl]`
- `[linkLabel]`
