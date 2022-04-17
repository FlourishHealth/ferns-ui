export const SPACING = 4;
export const iconSizeToNumber = (size) => {
    return {
        xs: 8,
        sm: 12,
        md: 14,
        lg: 20,
        xl: 26,
    }[size || "md"];
};
export const iconNumberToSize = (size = 16) => {
    let iconSize;
    if (size < 8) {
        iconSize = "xs";
    }
    else if (size < 12) {
        iconSize = "sm";
    }
    else if (size < 14) {
        iconSize = "md";
    }
    else if (size < 20) {
        iconSize = "lg";
    }
    else {
        iconSize = "xl";
    }
    return iconSize;
};
export function getSectionColor(section) {
    return ({
        Breakfast: "orchid",
        Lunch: "blue",
        Dinner: "orange",
        Snack: "red",
        "Second Snack": "red",
        Workout: "pine",
        workouts: "pine",
    }[section] || "blue");
}
export function isTestUser(profile) {
    return (profile &&
        profile.email &&
        (profile.email.indexOf("nang.io") > -1 || profile.email.indexOf("example.com") > -1));
}
//# sourceMappingURL=Common.js.map
//# sourceMappingURL=Common.js.map