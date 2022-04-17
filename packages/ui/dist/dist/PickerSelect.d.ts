declare class RNPickerSelect extends React.PureComponent<any, any, any> {
    static handlePlaceholder({ placeholder }: {
        placeholder: any;
    }): any[];
    static getSelectedItem({ items, key, value }: {
        items: any;
        key: any;
        value: any;
    }): {
        selectedItem: any;
        idx: any;
    };
    constructor(props: any);
    componentDidUpdate: (prevProps: any, prevState: any) => void;
    state: {
        items: any[];
        selectedItem: any;
        showPicker: boolean;
        animationType: undefined;
        orientation: string;
        doneDepressed: boolean;
    };
    onUpArrow(): void;
    onDownArrow(): void;
    onValueChange(value: any, index: any): void;
    onOrientationChange({ nativeEvent }: {
        nativeEvent: any;
    }): void;
    setInputRef(ref: any): void;
    togglePicker(animate: boolean | undefined, postToggleCallback: any): void;
    renderInputAccessoryView(): React.CElement<{
        testID: string;
    }, React.Component<{
        testID: string;
    }, any, any>> | React.CElement<{
        style: any[];
        testID: string;
    }, React.Component<{
        style: any[];
        testID: string;
    }, any, any>>;
    inputRef: any;
    getPlaceholderStyle(): any;
    triggerOpenCloseCallbacks(): void;
    renderPickerItems(): React.ReactElement<import("@react-native-picker/picker").PickerItemProps<T>, string | React.JSXElementConstructor<any>>[];
    renderIcon(): React.CElement<{
        testID: string;
        style: any[];
    }, React.Component<{
        testID: string;
        style: any[];
    }, any, any>> | null;
    renderTextInputOrChildren(): React.CElement<{
        pointerEvents: string;
        style: any;
    }, React.Component<{
        pointerEvents: string;
        style: any;
    }, any, any>>;
    renderIOS(): React.CElement<{
        style: any[];
    }, React.Component<{
        style: any[];
    }, any, any>>;
    renderAndroidHeadless(): React.CElement<any, React.Component<any, any, any>>;
    renderAndroidNativePickerStyle(): React.CElement<{
        style: any[];
    }, React.Component<{
        style: any[];
    }, any, any>>;
    renderWeb(): React.CElement<{
        style: any[];
    }, React.Component<{
        style: any[];
    }, any, any>>;
    render(): React.CElement<any, React.Component<any, any, any>> | React.CElement<{
        style: any[];
    }, React.Component<{
        style: any[];
    }, any, any>>;
}
declare namespace RNPickerSelect {
    namespace propTypes {
        const onValueChange: PropTypes.Validator<(...args: any[]) => any>;
        const items: PropTypes.Validator<(PropTypes.InferProps<{
            label: PropTypes.Validator<string>;
            value: PropTypes.Validator<any>;
            inputLabel: PropTypes.Requireable<string>;
            key: PropTypes.Requireable<string | number>;
            color: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        const value: PropTypes.Requireable<any>;
        const placeholder: PropTypes.Requireable<PropTypes.InferProps<{
            label: PropTypes.Requireable<string>;
            value: PropTypes.Requireable<any>;
            key: PropTypes.Requireable<string | number>;
            color: PropTypes.Requireable<string>;
        }>>;
        const disabled: PropTypes.Requireable<boolean>;
        const itemKey: PropTypes.Requireable<string | number>;
        const style: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const children: PropTypes.Requireable<any>;
        const onOpen: PropTypes.Requireable<(...args: any[]) => any>;
        const useNativeAndroidPickerStyle: PropTypes.Requireable<boolean>;
        const fixAndroidTouchableBug: PropTypes.Requireable<boolean>;
        const doneText: PropTypes.Requireable<string>;
        const onDonePress: PropTypes.Requireable<(...args: any[]) => any>;
        const onUpArrow: PropTypes.Requireable<(...args: any[]) => any>;
        const onDownArrow: PropTypes.Requireable<(...args: any[]) => any>;
        const onClose: PropTypes.Requireable<(...args: any[]) => any>;
        const modalProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const textInputProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const pickerProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const touchableDoneProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const touchableWrapperProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const Icon: PropTypes.Requireable<(...args: any[]) => any>;
        const InputAccessoryView: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const value_1: undefined;
        export { value_1 as value };
        export namespace placeholder_1 {
            export const label: string;
            const value_2: null;
            export { value_2 as value };
            export const color: string;
        }
        export { placeholder_1 as placeholder };
        const disabled_1: boolean;
        export { disabled_1 as disabled };
        const itemKey_1: null;
        export { itemKey_1 as itemKey };
        const style_1: {};
        export { style_1 as style };
        const children_1: null;
        export { children_1 as children };
        const useNativeAndroidPickerStyle_1: boolean;
        export { useNativeAndroidPickerStyle_1 as useNativeAndroidPickerStyle };
        const fixAndroidTouchableBug_1: boolean;
        export { fixAndroidTouchableBug_1 as fixAndroidTouchableBug };
        const doneText_1: string;
        export { doneText_1 as doneText };
        const onDonePress_1: null;
        export { onDonePress_1 as onDonePress };
        const onUpArrow_1: null;
        export { onUpArrow_1 as onUpArrow };
        const onDownArrow_1: null;
        export { onDownArrow_1 as onDownArrow };
        const onOpen_1: null;
        export { onOpen_1 as onOpen };
        const onClose_1: null;
        export { onClose_1 as onClose };
        const modalProps_1: {};
        export { modalProps_1 as modalProps };
        const textInputProps_1: {};
        export { textInputProps_1 as textInputProps };
        const pickerProps_1: {};
        export { pickerProps_1 as pickerProps };
        const touchableDoneProps_1: {};
        export { touchableDoneProps_1 as touchableDoneProps };
        const touchableWrapperProps_1: {};
        export { touchableWrapperProps_1 as touchableWrapperProps };
        const Icon_1: null;
        export { Icon_1 as Icon };
        const InputAccessoryView_1: null;
        export { InputAccessoryView_1 as InputAccessoryView };
    }
}
export default RNPickerSelect;
import React from "react";
import PropTypes from "prop-types";
export const defaultStyles: any;
