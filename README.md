# ferns-ui

[![Netlify Status](https://api.netlify.com/api/v1/badges/ffd05ee5-fbcf-417e-8455-45ea15447361/deploy-status)](https://app.netlify.com/sites/ferns-ui/deploys)

This package gives you a consistent React Native and React Native Web UI, along with theming support. It's primarily
designed to work with Expo.  It does this  by creating a higher level abstraction over both and providing components
that work the same on all supported platforms. For example, instead of using
`<div>` and `<View>`, you use `<Box>` which provides a flexbox-first layout system,
translated to `<div>` and `<View>`.

`ferns-ui` also provides an abstraction for many of the features of native and web,
such as Camera, Permissions, etc. This way you can write apps that work similarly
on all 3 platforms.

`ferns-ui` is Typescript first.

`ferns-ui` supports theming, allowing you to change the colors and fonts of the
components.

Check out the demo app for easily seeing how the UIs work in iOS/Android/Web in packages/ui-demo

You can see the [web demo here](https://ferns-ui.netlify.app)

# Installation

    yarn add ferns-ui

# Usage

You must wrap your app in a FernsProvider to use the theme, Toasts, and other features.

    import { FernsProvider } from 'ferns-ui';

    const AppRoot = (): ReactElement => {
        return (
            <SafeAreaProvider>
                <FernsProvider>
                    <App />
                </FernsProvider>
            </SafeAreaProvider>
        );
    };


## Dev

    # Install dependencies
    yarn install

    # Build the UI continuously
    yarn build -w

    # In a separate window, run one of the following to run the demo app:
    yarn web
    yarn ios
    yarn android
    

## Dev with other projects

If you need to test your changes in another project, you can use this handy bash function:

    # sync ui to different app
    syncui() {
        cd <PATH>/ferns-ui/packages/ui && yarn build && rsync -avp <PATH>/ferns-ui/packages/ui/dist/* <PATH>/app/node_modules/ferns-ui/dist/
    }

Update the paths to match your project directories. This will build and pack up ferns-ui like it is being
send to NPM, then install it from the created tarball in your app. `yarn link` is also an option but React
Native requires extra configuration to support symlinks.

