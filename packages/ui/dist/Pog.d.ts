/// <reference types="react" />
import { AllColors, IconPrefix, IconSize } from "./Common";
interface Props {
    active?: boolean;
    bgColor?: "transparent" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "blue";
    focused?: boolean;
    hovered?: boolean;
    selected?: boolean;
    iconColor?: AllColors;
    icon: string;
    iconPrefix?: IconPrefix;
    size?: IconSize;
}
export default function Pog(props: Props): JSX.Element;
export {};
