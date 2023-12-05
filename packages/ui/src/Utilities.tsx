// Originally based on https://github.com/pinterest/gestalt
// Forked, updated to Typescript, and added features.
import get from "lodash/get";
import {Platform} from "react-native";

import {COUNTY_AND_COUNTY_EQUIVALENT_ENTITIES} from "./Constants";

export function mergeInlineStyles(inlineStyle?: any, newStyle?: any) {
  const inline = get(inlineStyle, "__style");
  return {
    __style: {
      ...inline,
      ...newStyle,
    },
  };
}

/*

Style is a monoid that capture the "to-be-applied" styles (inline and classes)
for a Box. It's basically set that is closed under an associative binary
operation and has an identity element such that for all HA HA HA. Yes, it's a
monoid, which sounds scary but it's not really and actually super useful. All
that means is that basically you can do two things with it:

    1. concat(concat(a, b), c) === concat(a, concat(b, c));
    2. concat(identity(), a) === concat(a, identity()) === a;

What that means is that it's really easy to compose styles together and the
order in which you do so doesn't really matter.

*/

interface InlineStyle {
  [key: string]: string | number | void;
}

// TODO: This type should be opaque, however the Babel parser doesn't support
//       the opaque syntax yet.
export interface Style {
  className: Set<string>;
  inlineStyle: InlineStyle;
}

export const identity = (): Style => ({
  className: new Set(),
  inlineStyle: {},
});

export const fromClassName = (...classNames: string[]): Style => ({
  className: new Set(classNames),
  inlineStyle: {},
});

export const fromInlineStyle = (inlineStyle: InlineStyle): Style => ({
  className: new Set(),
  inlineStyle,
});

export const concat = (styles: Style[]): Style =>
  styles.reduce(
    (
      {className: classNameA, inlineStyle: inlineStyleA},
      {className: classNameB, inlineStyle: inlineStyleB}
    ) => ({
      className: new Set([...classNameA, ...classNameB]),
      inlineStyle: {...inlineStyleA, ...inlineStyleB},
    }),
    identity()
  );

export const mapClassName =
  (fn: (x: string) => string) =>
  ({className, inlineStyle}: Style): Style => ({
    className: new Set(Array.from(className).map(fn)),
    inlineStyle,
  });

export const toProps = ({
  className,
  inlineStyle,
}: Style): {className: string; style: InlineStyle} => {
  const props: any = {};

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

/*

Transforms

These are a collection of a few functors that take values and returns Style's. OMG, I used the word functor - it's really just a fancy word for function.

*/
type Functor<T> = (n: T) => Style;

// Adds a classname when a property is present.
//
//     <Box top />
//
export const toggle =
  (...classNames: string[]) =>
  (val?: boolean) =>
    val ? fromClassName(...classNames) : identity();

// Maps string values to classes
//
//     <Box alignItems="center" />
//
export const mapping = (map: {[key: string]: string}) => (val: string) =>
  Object.prototype.hasOwnProperty.call(map, val) ? fromClassName(map[val]) : identity();

// Maps a range of integers to a range of classnames
//
//     <Box padding={1} />
//
export const range =
  (scale: string) =>
  (n: number): Style =>
    fromClassName(`${scale}${n < 0 ? `N${Math.abs(n)}` : n}`);

// Like `range`, maps a range of integers to a range of classnames, excluding
// zero values.
//
//     <Box padding={0} />
export const rangeWithoutZero =
  (scale: string) =>
  (n: number): Style =>
    n === 0 ? identity() : range(scale)(n);

// Binds a string classname to the value in an object. Useful when interacting
// with ranges that need to come dynamically from a style object. This is
// similar to the NPM package 'classnames/bind'.
export function bind<T>(
  fn: Functor<T>,
  scope:
    | {
        readonly [key: string]: string;
      }
    | any
): (val: T) => Style {
  const map = mapClassName((name) => scope[name]);
  return (val: T): Style => map(fn(val));
}

// This takes a series of the previously defined functors, runs them all
// against a value and returns the set of their classnames.
export const union =
  <T,>(...fns: Functor<T>[]) =>
  (val: T) =>
    concat(fns.map((fn) => fn(val)));

export const isNative = (): boolean => {
  return ["android", "ios"].includes(Platform.OS);
};

// Find more information about the address component types here: https://developers.google.com/maps/documentation/javascript/place-autocomplete
export type AddressComponentType = {
  long_name: string;
  short_name: string;
  types: string[];
};

export const findAddressComponent = (components: AddressComponentType[], type: string): string => {
  return (
    components.find((component: AddressComponentType) => component.types.includes(type))
      ?.long_name ?? ""
  );
};

export const processAddressComponents = (addressComponents: AddressComponentType[] | undefined) => {
  if (!addressComponents || addressComponents.length === 0) {
    return {
      address1: "",
      city: "",
      state: "",
      zipcode: "",
      countyName: "",
    };
  }
  const streetNumber = findAddressComponent(addressComponents, "street_number");
  const streetName = findAddressComponent(addressComponents, "route");
  const city = findAddressComponent(addressComponents, "locality");
  const state = findAddressComponent(addressComponents, "administrative_area_level_1");
  const zipcode = findAddressComponent(addressComponents, "postal_code");
  const countyName = findAddressComponent(addressComponents, "administrative_area_level_2");

  if (state && countyName) {
    const countyCode = formattedCountyCode(state, countyName);
    return {
      address1: `${streetNumber} ${streetName}`.trim(),
      city,
      state,
      zipcode,
      countyName,
      countyCode,
    };
  }
  return {
    address1: `${streetNumber} ${streetName}`.trim(),
    city,
    state,
    zipcode,
    countyName,
  };
};

// Google does not provide a way to validate API keys, so we have to do it ourselves
export const isValidGoogleApiKey = (apiKey: string): boolean => {
  if (typeof apiKey !== "string" || apiKey.trim().length === 0) {
    return false;
  }
  // Typical Google API keys are around 39 characters
  if (apiKey.length < 30 || apiKey.length > 50) {
    return false;
  }
  // Check the presence of alphanumeric characters and dashes
  const apiKeyRegex = /^[A-Za-z0-9-_]+$/;
  if (!apiKeyRegex.test(apiKey)) {
    return false;
  }
  return true;
};

export function formattedCountyCode(state: string, countyName: string): string {
  // Remove whitespace and convert to lowercase for comparison
  const stateKey = state.replace(/\s+/g, "").toLowerCase();
  // Remove whitespace, periods, apostrophes, and dashes for comparison
  const countyKey = countyName
    .trim()
    .toLowerCase()
    .replace(/[\s.'-]/g, "");

  const countyData = COUNTY_AND_COUNTY_EQUIVALENT_ENTITIES[stateKey]?.[countyKey];
  if (!countyData) {
    return "";
  }

  return `${countyData.stateFP}${countyData.countyFP}`;
}
