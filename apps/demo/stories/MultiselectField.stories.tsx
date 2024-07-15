import {Box, isMobileDevice, MultiselectField, MultiselectFieldProps} from "ferns-ui";
import React from "react";

export const MultiselectFieldDemo = (props: Partial<MultiselectFieldProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <Box padding={3} width="100%">
        <MultiselectField
          options={[
            {label: "Option 1", value: "Option 1"},
            {label: "Option 2", value: "Option 2"},
            {label: "Option 3", value: "Option 3"},
          ]}
          title="Multiselect Field"
          value={["Option 1"]}
          onChange={() => console.info("selected")}
          {...props}
        />
      </Box>
    </Box>
  );
};

export const MultiselectVariants = () => {
  const isMobile = isMobileDevice();
  return (
    <Box width={isMobile ? undefined : "30%"}>
      <Box padding={3}>
        <MultiselectField
          options={[
            {label: "Option 1", value: "Option 1"},
            {label: "Option 2", value: "Option 2"},
            {label: "Option 3", value: "Option 3"},
          ]}
          title='Default - Variant "leftText"'
          value={["Option 1"]}
          onChange={() => console.info("selected")}
        />
      </Box>
      <Box padding={3}>
        <MultiselectField
          options={[
            {label: "Option 1", value: "Option 1"},
            {label: "Option 2", value: "Option 2"},
            {label: "Option 3", value: "Option 3"},
          ]}
          title='Variant "rightText"'
          value={["Option 1"]}
          variant="rightText"
          onChange={() => console.info("selected")}
        />
      </Box>
    </Box>
  );
};
