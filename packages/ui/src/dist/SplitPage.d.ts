import React from "react";
import { Color } from "./Common";
import { ListRenderItemInfo } from "react-native";
interface SplitPageProps {
    navigation: any;
    loading?: boolean;
    color?: Color;
    keyboardOffset?: number;
    rightButton?: string;
    rightButtonOnClick?: () => void;
    renderListViewItem: (itemInfo: ListRenderItemInfo<any>) => React.ReactElement | null;
    renderListViewHeader?: () => React.ReactElement | null;
    listViewData: any[];
    listViewExtraData?: any;
}
interface SplitPageState {
}
export declare class SplitPage extends React.Component<SplitPageProps, SplitPageState> {
    actionSheetRef: React.RefObject<any>;
    render(): JSX.Element;
}
export {};
