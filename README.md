# ferns-ui

[![Netlify Status](https://api.netlify.com/api/v1/badges/ffd05ee5-fbcf-417e-8455-45ea15447361/deploy-status)](https://app.netlify.com/sites/ferns-ui/deploys)

This package gives you a consistent React Native and React Native Web UI, along with theming support. It's primarily
designed to work with Expo.

Check out the demo app for easily seeing how the UIs work in iOS/Android/Web in packages/ui-demo

You can see the [web demo here](https://ferns-ui.netlify.app)

## Dev

To make developing easy, link ui and ui-demo together with `yarn link` with this helper script:

    yarn make-links

Now you will be using the local ferns-ui package and the demo will update as you change the code. You'll need to be
compiling the ui code and running the demo in separate terminals:

    # In two different terminals:
    yarn dev
    yarn web

`yarn dev` will start the Typescript compiler. `yarn web` will launch the ui-demo in Expo for web.

## Dev with other projects

If you need to test your changes in another project, you can use this handy bash function:

     ui() {
        set -ex
        cd ~/src/ferns-ui/packages/ui
        yarn build
        yarn pack --filename /tmp/ui.tgz
        cd ~/src/app
        yarn add file:/tmp/ui.tgz
    }

Update the paths to match your project directories. This will build and pack up ferns-ui like it is being
send to NPM, then install it from the created tarball in your app. `yarn link` is also an option but React
Native requires extra configuration to support symlinks.
