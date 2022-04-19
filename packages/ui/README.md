# @ferns/ui

This package provides an abstraction for React (web) and React-Native code,
so the code and components you write work the same on both platforms. It does this
by creating a higher level abstraction over both and providing components
that work the same on all supported platforms. For example, instead of using
`<div>` and `<View>`, you use `<Box>` which provides a flexbox-first layout system,
translated to `<div>` and `<View>`.

`@ferns/ui` also provides an abstraction for many of the features of native and web,
such as Camera, Permissions, etc. This way you can write apps that work similarly
on all 3 platforms.

`@ferns/ui` is Typescript first.

You can easily add your own components by creating a `Foo.tsx` and
`Foo.native.tsx` component. Most of the `@ferns/ui` components are implemented
this way, with some only having a single `Component.tsx` if the component is a
higher level component that already works the same on all platforms.

`@ferns/ui` supports theming, allowing you to change the colors and fonts of the
components.
