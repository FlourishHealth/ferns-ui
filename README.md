# ferns-ui

This package gives you a consistent React Native and React Native Web UI, along with theming support. It's primarily
designed to work with Expo.

There is a demo app for easily checking out the UIs in iOS/Android/Web in packages/ui-demo

## Dev

To make developing easy, link ui and ui-demo together with `yarn link` with this helper script:

    yarn make-links

Now you will be using the local ferns-ui package and the demo will update as you change the code. You'll need to be
compiling the ui code and running the demo in separate terminals:

    # In two different terminals:
    yarn dev
    yarn web

`yarn dev` will start the Typescript compiler. `yarn web` will launch the ui-demo in Expo for web.