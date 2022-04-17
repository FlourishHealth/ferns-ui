import React from "react";
import {ActionSheet} from "./ActionSheet";

import {Box} from "./Box";
import {Button} from "./Button";
import {Picker} from "@react-native-picker/picker";
import {OnChangeCallback} from "./Common";
import range from "lodash/range";

const PICKER_HEIGHT = 104;

interface NumberPickerActionSheetProps {
  value: string;
  min: number;
  max: number;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

interface NumberPickerActionSheetState {}

export class NumberPickerActionSheet extends React.Component<
  NumberPickerActionSheetProps,
  NumberPickerActionSheetState
> {
  constructor(props: NumberPickerActionSheetProps) {
    super(props);
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
          <Picker
            style={{
              height: PICKER_HEIGHT,
              backgroundColor: "#FFFFFF",
            }}
            itemStyle={{
              height: PICKER_HEIGHT,
            }}
            selectedValue={String(this.props.value)}
            onValueChange={(itemValue) => this.props.onChange({value: String(itemValue)})}
          >
            {range(this.props.min, this.props.max).map((n) => (
              <Picker.Item key={String(n)} label={String(n)} value={String(n)} />
            ))}
          </Picker>
        </Box>
      </ActionSheet>
    );
  }
}
