import moment from "moment-timezone";
import React from "react";
import {ActivityIndicator, KeyboardTypeOptions, Platform, TextInput, View} from "react-native";
import {Box} from "./Box";
import {TextFieldProps} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {DecimalRangeActionSheet} from "./DecimalRangeActionSheet";
import {HeightActionSheet} from "./HeightActionSheet";
import {Icon} from "./Icon";
import {NumberPickerActionSheet} from "./NumberPickerActionSheet";
import {Unifier} from "./Unifier";
import {WithLabel} from "./WithLabel";

interface TextFieldState {
  focused: boolean;
  height: number;
}

export class TextField extends React.Component<TextFieldProps, TextFieldState> {
  dateActionSheetRef: React.RefObject<any> = React.createRef();
  numberRangeActionSheetRef: React.RefObject<any> = React.createRef();
  decimalRangeActionSheetRef: React.RefObject<any> = React.createRef();
  weightActionSheetRef: React.RefObject<any> = React.createRef();

  constructor(props: TextFieldProps) {
    super(props);
    this.state = {focused: false, height: props.height || 40};
  }

  keyboardMap = {
    date: "default",
    email: "email-address",
    number: "number-pad",
    numberRange: "number-pad",
    decimalRange: "decimal-pad",
    decimal: "decimal-pad",
    height: "default",
    password: "default",
    search: "default",
    text: "default",
    url: Platform.select({
      ios: "url",
      android: "default",
    }),
    username: "default",
  };

  textContentMap = {
    date: "none",
    email: "emailAddress",
    number: "none",
    decimal: "none",
    decimalRange: "none",
    height: "none",
    password: "password",
    search: "none",
    text: "none",
    url: Platform.select({
      ios: "URL",
      android: "none",
    }),
    username: "username",
  };

  renderIcon() {
    if (this.props.type !== "search") {
      return null;
    }
    if (this.props.searching === true) {
      return (
        <Box marginRight={4}>
          <ActivityIndicator color={Unifier.theme["primary"]} size="small" />
        </Box>
      );
    } else {
      return (
        <Box marginRight={2}>
          <Icon prefix="far" size={14} name="search" />
        </Box>
      );
    }
  }

  getBorderColor = () => {
    if (this.props.errorMessage) {
      return Unifier.theme.red;
    } else if (this.state.focused) {
      return Unifier.theme.blue;
    } else {
      return Unifier.theme.gray;
    }
  };

  getHeight = () => {
    if (this.props.grow) {
      return Math.max(40, this.state.height);
    } else if (this.props.multiline) {
      return this.props.height || "100%";
    } else {
      return 40;
    }
  };

  focus() {
    // Empty
  }

  isEditable() {
    return !this.props.disabled && !this.isHandledByModal();
  }

  isHandledByModal = () => {
    return (
      this.props.type === "date" ||
      this.props.type === "numberRange" ||
      this.props.type === "decimalRange" ||
      this.props.type === "height"
    );
  };

  render() {
    const type = this.props.type || "text";
    const keyboardType = this.keyboardMap[type];
    // let textContentType = this.textContentMap[this.props.type || "text"];
    const {errorMessage, ...props} = this.props;
    let value = this.props.value;
    if (this.props.type === "date") {
      value = moment(this.props.value).format("MM/DD/YYYY");
    } else if (this.props.type === "height") {
      value = `${Math.floor(Number(this.props.value) / 12)} ft, ${Number(this.props.value) %
        12} in`;
    }
    return (
      <>
        <WithLabel
          label={errorMessage}
          labelPlacement="after"
          labelColor={this.props.errorMessageColor || "red"}
          labelSize="sm"
        >
          <WithLabel {...props}>
            <View
              onTouchEnd={() => {
                if (this.props.type === "date") {
                  this.dateActionSheetRef?.current?.setModalVisible(true);
                } else if (this.props.type === "numberRange") {
                  this.numberRangeActionSheetRef?.current?.setModalVisible(true);
                } else if (this.props.type === "decimalRange") {
                  this.decimalRangeActionSheetRef?.current?.setModalVisible(true);
                } else if (this.props.type === "height") {
                  this.weightActionSheetRef?.current?.setModalVisible(true);
                }
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // height: 40,
                // minHeight: this.getHeight(),
                minHeight: this.getHeight(),
                width: "100%",
                // Add padding so the border doesn't mess up layouts
                paddingHorizontal: this.props.paddingX || this.state.focused ? 10 : 14,
                paddingVertical: this.props.paddingY || this.state.focused ? 0 : 4,
                borderColor: this.getBorderColor(),
                borderWidth: this.state.focused && !this.props.errorMessage ? 5 : 1,
                borderRadius: 16,
                backgroundColor: this.props.disabled ? Unifier.theme.gray : Unifier.theme.white,
                overflow: "hidden",
              }}
            >
              {this.renderIcon()}
              <TextInput
                style={{
                  flex: 1,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 0,
                  height: this.getHeight(),
                  width: "100%",
                  color: Unifier.theme.darkGray,
                  fontFamily: Unifier.theme.primaryFont,
                  // Remove border in web.
                  outlineWidth: 0,
                  ...this.props.style,
                }}
                keyboardType={keyboardType as KeyboardTypeOptions}
                onChangeText={(text) => {
                  this.props.onChange({value: text});
                }}
                value={value}
                // TODO: uncomment with upgrade to React 0.56.
                // textContentType={textContentType}
                placeholder={this.props.placeholder}
                placeholderTextColor={Unifier.theme.gray}
                secureTextEntry={type === "password"}
                editable={this.isEditable()}
                autoCapitalize={type === "text" ? "sentences" : "none"}
                underlineColorAndroid="transparent"
                onFocus={() => {
                  if (!this.isHandledByModal()) {
                    this.setState({focused: true});
                  }
                }}
                onBlur={() => {
                  if (!this.isHandledByModal()) {
                    this.setState({focused: false});
                  }
                  if (this.props.onBlur && this.props.value) {
                    this.props.onBlur({value: this.props.value});
                  }
                  // if (this.props.type === "date") {
                  //   this.actionSheetRef?.current?.setModalVisible(false);
                  // }
                }}
                // For react-native-autofocus
                ref={(ref) => {
                  if (this.props.inputRef) {
                    this.props.inputRef(ref);
                  }
                }}
                onSubmitEditing={() => {
                  if (this.props.onEnter) {
                    this.props.onEnter();
                  }
                  if (this.props.onSubmitEditing) {
                    this.props.onSubmitEditing();
                  }
                }}
                onContentSizeChange={(event) => {
                  if (!this.props.grow) {
                    return;
                  }
                  this.setState({height: event.nativeEvent.contentSize.height});
                }}
                blurOnSubmit={true}
                returnKeyType={
                  type === "number" || type === "decimal" ? "done" : this.props.returnKeyType
                }
                autoFocus={this.props.autoFocus}
                multiline={this.props.multiline}
                numberOfLines={this.props.rows || 4}
              />
            </View>
          </WithLabel>
        </WithLabel>
        {this.props.type === "date" && (
          <DateTimeActionSheet
            actionSheetRef={this.dateActionSheetRef}
            mode="date"
            value={this.props.value}
            onChange={(result) => this.props.onChange(result)}
          />
        )}
        {this.props.type === "numberRange" && this.props.value && (
          <NumberPickerActionSheet
            actionSheetRef={this.numberRangeActionSheetRef}
            min={this.props.min || 0}
            max={this.props.max || (this.props.min || 0) + 100}
            value={this.props.value}
            onChange={(result) => this.props.onChange(result)}
          />
        )}
        {this.props.type === "decimalRange" && this.props.value && (
          <DecimalRangeActionSheet
            actionSheetRef={this.decimalRangeActionSheetRef}
            min={this.props.min || 0}
            max={this.props.max || (this.props.min || 0) + 100}
            value={this.props.value}
            onChange={(result) => this.props.onChange(result)}
          />
        )}
        {this.props.type === "height" && (
          <HeightActionSheet
            actionSheetRef={this.weightActionSheetRef}
            value={this.props.value}
            onChange={(result) => {
              this.props.onChange(result);
            }}
          />
        )}
      </>
    );
  }
}
