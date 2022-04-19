import React from "react";
import { WithLabel } from "./WithLabel";
export const FieldWithLabels = ({ children, errorMessage, errorMessageColor = "red", helperText, helperTextColor = "darkGray", label, labelColor = "darkGray", }) => {
    return (React.createElement(WithLabel, { label: helperText, labelColor: helperTextColor, labelPlacement: "after", labelSize: "sm", show: Boolean(helperText) },
        React.createElement(WithLabel, { label: errorMessage, labelColor: errorMessageColor, labelPlacement: "after", labelSize: "md", show: Boolean(errorMessage) },
            React.createElement(WithLabel, { label: label, labelColor: labelColor, show: Boolean(label) }, children))));
};
//# sourceMappingURL=FieldWithLabels.js.map