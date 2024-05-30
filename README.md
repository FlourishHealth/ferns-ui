# ferns-ui

[![Netlify Status](https://api.netlify.com/api/v1/badges/ffd05ee5-fbcf-417e-8455-45ea15447361/deploy-status)](https://app.netlify.com/sites/ferns-ui/deploys)

## Why Ferns UI?
Ferns UI provides a consistent UI for React Native and React Native Web, with
theming support, primarily designed for Expo. It abstracts both platforms, 
offering components that work uniformly across all supported environments. 
For example, instead of using <div> and <View>, you use <Box>, which 
translates to a flexbox-first layout system.

Ideal for designers and developers who value clarity, Ferns UI offers a 
framework for efficient and harmonious designs. Our vision extends beyond a 
User Interface Library to a User Experience Library, including common UX 
patterns like login flows, allowing you to focus on unique aspects of your app.

Join us in embracing a design philosophy that prioritizes clarity and 
coherence. With Ferns UI, build stunning applications with seamless 
user experiences.

## Our Philosophy
Ferns UI streamlines design by reducing unnecessary choices, allowing you to 
create beautiful, functional interfaces without distraction. For example, 
buttons come in a limited set of colors, with no options for custom colors,
ensuring consistency.

## Consistent Layouts
Our layout system, built around the Box component and other layout elements, 
ensures flexible yet uniform design structures. It's is flexbox-first across
iOS, Android, and Web, making it easy to create responsive designs that work
across all platforms.

## Separated Interface Elements
Ferns UI and interaction components follow strict guidelines for consistency. 
For instance,  you can't add a margin to Text. Instead, you wrap the Text in a 
Box and add the margin to the Box, maintaining a clean and predictable design
language that separates layout elements from interface and interaction elements.

## Accessibility
Accessibility is a core principle of Ferns UI. Our components are designed to 
be fully accessible out of the box, following best practices to ensure that 
all users, including those with disabilities, have a seamless experience. 

## Developer Experience
Ferns UI is designed with a TypeScript-first approach, prioritizing an 
excellent developer experience. Our consistent API across all components 
ensures ease of learning and use. This makes it simple to design screens 
that work seamlessly across web and mobile, with built-in support for 
differentiating based on screen size and format.

Check out the demo app for easily seeing how the UIs work in iOS/Android/Web in apps/demo.

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

