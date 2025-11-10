export interface ITabOption<T = any> {
    label: string;
    value: T;
    url?: string;
    iconPrefix?: string;
    iconPrefixSize?: string;
    isExternalLink?: boolean;
}
