import {Picker} from "@react-native-picker/picker";
import range from "lodash/range";
import React from "react";

import {ActionSheet} from "./ActionSheet";
import {Box} from "./Box";
import {Button} from "./Button";
import {NumberPickerActionSheetProps} from "./Common";

const PICKER_HEIGHT = 104;

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
          <Picker
            itemStyle={{
              height: PICKER_HEIGHT,
            }}
            selectedValue={String(this.props.value)}
            style={{
              height: PICKER_HEIGHT,
              backgroundColor: "#FFFFFF",
            }}
            onValueChange={(itemValue) => this.props.onChange(String(itemValue))}
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
