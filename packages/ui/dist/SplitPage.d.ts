import React from "react";
import { ListRenderItemInfo } from "react-native";
import { Color } from "./Common";
interface SplitPageProps {
    navigation: any;
    loading?: boolean;
    color?: Color;
    keyboardOffset?: number;
    rightButton?: string;
    rightButtonOnClick?: () => void;
    renderListViewItem: (itemInfo: ListRenderItemInfo<any>) => React.ReactElement | null;
    renderListViewHeader?: () => React.ReactElement | null;
    renderContent: (index?: number) => React.ReactElement | null;
    listViewData: any[];
    listViewExtraData?: any;
    listViewWidth?: number;
}
interface SplitPageState {
    selectedId?: number;
}
export declare class SplitPage extends React.Component<SplitPageProps, SplitPageState> {
    state: {
        selectedId: undefined;
    };
    actionSheetRef: React.RefObject<any>;
    renderItem: (itemInfo: ListRenderItemInfo<any>) => JSX.Element;
    renderList: () => JSX.Element | null;
    renderListContent: () => JSX.Element;
    render(): JSX.Element;
}
export {};
