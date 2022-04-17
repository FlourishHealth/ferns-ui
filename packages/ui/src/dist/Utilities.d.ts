export declare function mergeInlineStyles(inlineStyle?: any, newStyle?: any): {
    __style: any;
};
interface InlineStyle {
    [key: string]: string | number | void;
}
export interface Style {
    className: Set<string>;
    inlineStyle: InlineStyle;
}
export declare const identity: () => Style;
export declare const fromClassName: (...classNames: string[]) => Style;
export declare const fromInlineStyle: (inlineStyle: InlineStyle) => Style;
export declare const concat: (styles: Style[]) => Style;
export declare const mapClassName: (fn: (x: string) => string) => ({ className, inlineStyle, }: Style) => Style;
export declare const toProps: ({ className, inlineStyle, }: Style) => {
    className: string;
    style: InlineStyle;
};
declare type Functor<T> = (n: T) => Style;
export declare const toggle: (...classNames: string[]) => (val?: boolean | undefined) => Style;
export declare const mapping: (map: {
    [key: string]: string;
}) => (val: string) => Style;
export declare const range: (scale: string) => (n: number) => Style;
export declare const rangeWithoutZero: (scale: string) => (n: number) => Style;
export declare function bind<T>(fn: Functor<T>, scope: {
    readonly [key: string]: string;
} | any): (val: T) => Style;
export declare const union: <T>(...fns: Functor<T>[]) => (val: T) => Style;
export {};
