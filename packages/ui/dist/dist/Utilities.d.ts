export function mergeInlineStyles(inlineStyle: any, newStyle: any): {
    __style: any;
};
export function bind(fn: any, scope: any): (val: any) => {
    className: Set<any>;
    inlineStyle: any;
};
export function identity(): {
    className: Set<any>;
    inlineStyle: {};
};
export function fromClassName(...classNames: any[]): {
    className: Set<any>;
    inlineStyle: {};
};
export function fromInlineStyle(inlineStyle: any): {
    className: Set<any>;
    inlineStyle: any;
};
export function concat(styles: any): any;
export function mapClassName(fn: any): ({ className, inlineStyle, }: {
    className: any;
    inlineStyle: any;
}) => {
    className: Set<any>;
    inlineStyle: any;
};
export function toProps({ className, inlineStyle, }: {
    className: any;
    inlineStyle: any;
}): {
    className: string;
    style: any;
};
export function toggle(...classNames: any[]): (val: any) => {
    className: Set<any>;
    inlineStyle: {};
};
export function mapping(map: any): (val: any) => {
    className: Set<any>;
    inlineStyle: {};
};
export function range(scale: any): (n: any) => {
    className: Set<any>;
    inlineStyle: {};
};
export function rangeWithoutZero(scale: any): (n: any) => {
    className: Set<any>;
    inlineStyle: {};
};
export function union(...fns: any[]): (val: any) => any;
