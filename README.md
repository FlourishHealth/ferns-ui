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