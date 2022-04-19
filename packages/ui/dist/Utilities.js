// Originally based on https://github.com/pinterest/gestalt
// Forked, updated to Typescript, and added features.
import get from "lodash/get";
export function mergeInlineStyles(inlineStyle, newStyle) {
    const inline = get(inlineStyle, "__style");
    const dangerouslySetInlineStyle = {
        __style: Object.assign(Object.assign({}, inline), newStyle),
    };
    return dangerouslySetInlineStyle;
}
export const identity = () => ({
    className: new Set(),
    inlineStyle: {},
});
export const fromClassName = (...classNames) => ({
    className: new Set(classNames),
    inlineStyle: {},
});
export const fromInlineStyle = (inlineStyle) => ({
    className: new Set(),
    inlineStyle,
});
export const concat = (styles) => styles.reduce(({ className: classNameA, inlineStyle: inlineStyleA }, { className: classNameB, inlineStyle: inlineStyleB }) => ({
    className: new Set([...classNameA, ...classNameB]),
    inlineStyle: Object.assign(Object.assign({}, inlineStyleA), inlineStyleB),
}), identity());
export const mapClassName = (fn) => ({ className, inlineStyle }) => ({
    className: new Set(Array.from(className).map(fn)),
    inlineStyle,
});
export const toProps = ({ className, inlineStyle, }) => {
    const props = {};
    if (className.size > 0) {
        // Sorting here ensures that classNames are always stable, reducing diff
        // churn. Box usually has a small number of properties so it's not a perf
        // concern.
        props.className = Array.from(className).sort().join(" ");
    }
    if (Object.keys(inlineStyle).length > 0) {
        props.style = inlineStyle;
    }
    return props;
};
// Adds a classname when a property is present.
//
//     <Box top />
//
export const toggle = (...classNames) => (val) => val ? fromClassName(...classNames) : identity();
// Maps string values to classes
//
//     <Box alignItems="center" />
//
export const mapping = (map) => (val) => Object.prototype.hasOwnProperty.call(map, val) ? fromClassName(map[val]) : identity();
// Maps a range of integers to a range of classnames
//
//     <Box padding={1} />
//
export const range = (scale) => (n) => fromClassName(`${scale}${n < 0 ? `N${Math.abs(n)}` : n}`);
// Like `range`, maps a range of integers to a range of classnames, excluding
// zero values.
//
//     <Box padding={0} />
export const rangeWithoutZero = (scale) => (n) => n === 0 ? identity() : range(scale)(n);
// Binds a string classname to the value in an object. Useful when interacting
// with ranges that need to come dynamically from a style object. This is
// similar to the NPM package 'classnames/bind'.
export function bind(fn, scope) {
    const map = mapClassName((name) => scope[name]);
    return (val) => map(fn(val));
}
// This takes a series of the previously defined functors, runs them all
// against a value and returns the set of their classnames.
export const union = (...fns) => (val) => concat(fns.map((fn) => fn(val)));
//# sourceMappingURL=Utilities.js.map