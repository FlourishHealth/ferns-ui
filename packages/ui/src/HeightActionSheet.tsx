import range from "lodash/range";
import React from "react";
import {ActionSheet} from "./ActionSheet";

import {Box} from "./Box";
import {Button} from "./Button";
import {Picker} from "@react-native-picker/picker";
import {OnChangeCallback} from "./Common";

const PICKER_HEIGHT = 104;

interface HeightActionSheetProps {
  value?: string;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

interface HeightActionSheetState {
  feet: string;
  inches: string;
}

export class HeightActionSheet extends React.Component<
  HeightActionSheetProps,
  HeightActionSheetState
> {
  constructor(props: HeightActionSheetProps) {
    super(props);
    this.state = {
      feet: String(Math.floor(Number(props.value) / 12)),
      inches: String(Number(props.value) % 12),
    };
  }

  render() {
    return (
      <ActionSheet ref={this.props.actionSheetRef} gestureEnabled={true} bounceOnOpen={true}>
        <Box width="100%" paddingX={4} marginBottom={8}>
          <Box width="100%" display="flex" alignItems="end">
            <Box width="33%">
              <Button
                type="ghost"
                text="Close"
                color="blue"
                size="lg"
                onClick={() => {
                  this.props.actionSheetRef?.current?.setModalVisible(false);
                }}
              />
            </Box>
          </Box>
          <Box width="100%" direction="row">
            <Box width="50%">
              <Picker
                style={{
                  height: PICKER_HEIGHT,
                  backgroundColor: "#FFFFFF",
                }}
                itemStyle={{
                  height: PICKER_HEIGHT,
                }}
                selectedValue={this.state.feet}
                onValueChange={(feet) => {
                  this.setState({feet: String(feet)});
                  this.props.onChange({
                    value: String(Number(feet) * 12 + Number(this.state.inches)),
                  });
                }}
              >
                {range(4, 8).map((n) => {
                  // console.log("FIRST", String(n));
                  return <Picker.Item key={String(n)} label={String(n) + "ft"} value={String(n)} />;
                })}
              </Picker>
            </Box>
            <Box width="50%">
              <Picker
                style={{
                  height: PICKER_HEIGHT,
                  backgroundColor: "#FFFFFF",
                }}
                itemStyle={{
                  height: PICKER_HEIGHT,
                }}
                selectedValue={this.state.inches}
                onValueChange={(inches) => {
                  this.setState({inches: String(inches)});
                  this.props.onChange({
                    value: String(Number(this.state.feet) * 12 + Number(inches)),
                  });
                }}
              >
                {range(0, 12).map((n) => {
                  // console.log("N", n);
                  return <Picker.Item key={String(n)} label={String(n) + "in"} value={String(n)} />;
                })}
              </Picker>
            </Box>
          </Box>
        </Box>
      </ActionSheet>
    );
  }
}
