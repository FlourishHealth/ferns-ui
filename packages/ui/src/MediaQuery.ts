import {Dimensions} from "react-native";

export function mediaQuery(): "xs" | "sm" | "md" | "lg" {
  const width = Dimensions.get("window").width;
  if (width < 576) {
    return "xs";
  } else if (width < 768) {
    return "sm";
  } else if (width < 1312) {
    return "md";
  } else {
    return "lg";
  }
}

export function mediaQueryLargerThan(size: "xs" | "sm" | "md" | "lg"): boolean {
  const media = mediaQuery();
  if (size === "xs") {
    return true;
  } else if (size === "sm") {
    return ["sm", "md", "lg"].includes(media);
  } else if (size === "md") {
    return ["md", "lg"].includes(media);
  } else if (size === "lg") {
    return ["lg"].includes(media);
  }
  return false;
}

export function mediaQuerySmallerThan(size: "xs" | "sm" | "md" | "lg"): boolean {
  const media = mediaQuery();
  if (size === "lg") {
    return true;
  } else if (size === "md") {
    return ["xs", "sm", "md"].includes(media);
  } else if (size === "sm") {
    return ["xs", "sm"].includes(media);
  } else if (size === "xs") {
    return ["xs"].includes(media);
  }
  return false;
}

export function isMobileDevice(): boolean {
  return !mediaQueryLargerThan("sm");
}
