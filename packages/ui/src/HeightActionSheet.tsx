import {Picker} from "@react-native-picker/picker";
import range from "lodash/range";
import React from "react";

import {ActionSheet} from "./ActionSheet";
import {Box} from "./Box";
import {Button} from "./Button";
import {HeightActionSheetProps} from "./Common";

const PICKER_HEIGHT = 104;

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
      <ActionSheet ref={this.props.actionSheetRef} bounceOnOpen gestureEnabled>
        <Box marginBottom={8} paddingX={4} width="100%">
          <Box alignItems="end" display="flex" width="100%">
            <Box width="33%">
              <Button
                text="Close"
                onClick={() => {
                  this.props.actionSheetRef?.current?.setModalVisible(false);
                }}
              />
            </Box>
          </Box>
          <Box direction="row" width="100%">
            <Box width="50%">
              <Picker
                itemStyle={{
                  height: PICKER_HEIGHT,
                }}
                selectedValue={this.state.feet}
                style={{
                  height: PICKER_HEIGHT,
                  backgroundColor: "#FFFFFF",
                }}
                onValueChange={(feet) => {
                  this.setState({feet: String(feet)});
                  this.props.onChange(String(Number(feet) * 12 + Number(this.state.inches)));
                }}
              >
                {range(4, 8).map((n) => {
                  // console.log("FIRST", String(n));
                  return <Picker.Item key={String(n)} label={`${String(n)}ft`} value={String(n)} />;
                })}
              </Picker>
            </Box>
            <Box width="50%">
              <Picker
                itemStyle={{
                  height: PICKER_HEIGHT,
                }}
                selectedValue={this.state.inches}
                style={{
                  height: PICKER_HEIGHT,
                  backgroundColor: "#FFFFFF",
                }}
                onValueChange={(inches) => {
                  this.setState({inches: String(inches)});
                  this.props.onChange(String(Number(this.state.feet) * 12 + Number(inches)));
                }}
              >
                {range(0, 12).map((n) => {
                  // console.log("N", n);
                  return <Picker.Item key={String(n)} label={`${String(n)}in`} value={String(n)} />;
                })}
              </Picker>
            </Box>
          </Box>
        </Box>
      </ActionSheet>
    );
  }
}
