/**
 * @providesModule Hyperlink
 *
 * Forked from https://github.com/obipawan/react-native-hyperlink
 *
 *
 * MIT License
 *
 * Copyright (c) 2019 Pawan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * */

/**
 * Hyperlink is used to wrap text that should be clickable.
 * It will automatically detect URLs and open them in the browser. For example,
 * this is great for wrapping text in a chat app so any link in a chat message is clickable.
 * This is different than <Link> which is meant for specifically linking to a URL.
 */

import * as mdurl from "mdurl";
import React from "react";
import {Linking, Platform, Text, View} from "react-native";

import {HyperlinkProps} from "./Common";

const linkifyLib = require("linkify-it")();

const {OS} = Platform;

// Leaving this as a class component because it was easier to handle the `parse(this)` in
// `render()`
class HyperlinkComponent extends React.Component<HyperlinkProps> {
  isTextNested = (component: any) => {
    if (!React.isValidElement(component)) throw new Error("Invalid component");
    const {type: {displayName} = {} as any} = component;
    if (displayName !== "Text") throw new Error("Not a Text component");
    return typeof (component.props as any).children !== "string";
  };

  linkify = (component: any) => {
    const linkifyIt = this.props.linkify || linkifyLib;

    if (!linkifyIt.pretest(component.props.children) || !linkifyIt.test(component.props.children))
      return component;

    const elements = [];
    let _lastIndex = 0;

    const componentProps = {
      ...component.props,
      ref: undefined,
      key: undefined,
    };

    try {
      linkifyIt.match(component.props.children).forEach(({index, lastIndex, text, url}: any) => {
        const nonLinkedText = component.props.children.substring(_lastIndex, index);
        nonLinkedText && elements.push(nonLinkedText);
        _lastIndex = lastIndex;
        if (this.props.linkText)
          text =
            typeof this.props.linkText === "function"
              ? this.props.linkText(url)
              : this.props.linkText;

        const clickHandlerProps: any = {};
        if (OS !== "web") {
          if (this.props.onLongPress) {
            clickHandlerProps.onLongPress = () => (this.props as any).onLongPress(url, text);
          }
        }
        if (this.props.onPress) {
          clickHandlerProps.onPress = () => (this.props as any).onPress(url, text);
        }

        let injected: any = {};
        if (this.props.injectViewProps) {
          injected = this.props.injectViewProps(url);
        }

        elements.push(
          <Text
            {...componentProps}
            {...clickHandlerProps}
            key={url + index}
            style={[component.props.style, this.props.linkStyle]}
            {...injected}
          >
            {text}
          </Text>
        );
      });
      elements.push(
        component.props.children.substring(_lastIndex, component.props.children.length)
      );
      return React.cloneElement(component, componentProps, elements);
    } catch (error) {
      return component;
    }
  };

  parse = (component: any): React.ReactElement => {
    const {props: {children} = {} as any} = component || {};
    if (!children) return component;

    const componentProps = {
      ...component.props,
      ref: undefined,
      key: undefined,
    };

    const linkifyIt = this.props.linkify || linkifyLib;

    return React.cloneElement(
      component,
      componentProps,
      React.Children.map(children, (child) => {
        const {type: {displayName} = {} as any} = child || {};
        if (typeof child === "string" && linkifyIt.pretest(child))
          return this.linkify(
            <Text {...componentProps} style={component.props.style}>
              {child}
            </Text>
          );
        if (displayName === "Text" && !this.isTextNested(child)) return this.linkify(child);
        return this.parse(child);
      })
    );
  };

  render() {
    const {...viewProps} = this.props;
    delete viewProps.onPress;
    delete viewProps.linkDefault;
    delete viewProps.onLongPress;
    delete viewProps.linkStyle;

    return (
      <View {...viewProps} style={this.props.style}>
        {!this.props.onPress && !this.props.onLongPress && !this.props.linkStyle
          ? this.props.children
          : this.parse(this).props.children}
      </View>
    );
  }
}

export const Hyperlink = (props: HyperlinkProps) => {
  const handleLink = (url: string) => {
    const urlObject = mdurl.parse(url);
    urlObject.protocol = urlObject.protocol.toLowerCase();
    const normalizedURL = mdurl.format(urlObject);

    void Linking.canOpenURL(normalizedURL).then(
      (supported) => supported && Linking.openURL(normalizedURL)
    );
  };

  const onPress = handleLink || props.onPress;
  if (props.linkDefault) return <HyperlinkComponent {...props} onPress={onPress} />;
  return <HyperlinkComponent {...props} />;
};
