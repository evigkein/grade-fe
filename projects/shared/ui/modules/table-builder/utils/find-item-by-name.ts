export function findItemByName<T extends {name: string}>(items: T[], value: string): T | undefined {
    return items.find(item => item.name === value);
}
