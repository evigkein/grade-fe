```ts
@HostListener('keydown', ['$event'])
handleKeyDown(event: KeyboardEvent): void {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') return this.submit();
if (event.key === 'Escape' || event.key === 'Esc') return this.cancel();
}
```
