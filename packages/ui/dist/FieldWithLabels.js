import React from "react";
import { WithLabel } from "./WithLabel";
export function FieldWithLabels({ children, errorMessage, errorMessageColor = "red", helperText, helperTextColor = "darkGray", label, labelColor = "darkGray", }) {
    return (React.createElement(WithLabel, { show: Boolean(helperText), label: helperText, labelPlacement: "after", labelSize: "sm", labelColor: helperTextColor },
        React.createElement(WithLabel, { show: Boolean(errorMessage), label: errorMessage, labelPlacement: "after", labelSize: "md", labelColor: errorMessageColor },
            React.createElement(WithLabel, { show: Boolean(label), label: label, labelColor: labelColor }, children))));
}
//# sourceMappingURL=FieldWithLabels.js.map