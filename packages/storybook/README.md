# React Unifier

This package provides an abstraction for React (web) and React-Native code,
so the code and components you write work the same on both platforms. It does this
by creating a higher level abstraction over both (Unifier) and providing components
that work the same on all supported platforms. For example, instead of using
`<div>` and `<View>`, you use `<Box>` which provides a flexbox-first layout system,
translated to `<div>` and `<View>`.

`react-unifier` is a package you can import in React or React Native. Underneath,
it imports `react-unifier-web` and `react-unifier-native` depending where it's used.
This means you won't be bundling React Native-specific code in your web bundles and
vice versa.

`Unifier` also provides an abstraction for many of the features of native and web,
such as Camera, Permissions, etc. This way you can write apps that work similarly
on all 3 platforms.

`react-unifier` is Typescript first.

You can easily add your own Unifier components by creating a `Foo.tsx` and
`Foo.native.tsx` component. Most of the `react-unifier` components are implemented
this way, with some only having a single `Component.tsx` if the component is a
higher level component that already works the same on all platforms.

Unifier supports theming, allowing you to change the colors and fonts of the
components.
