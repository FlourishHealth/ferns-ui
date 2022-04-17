import React from "react";
import { BackButtonInterface, SearchButtonProps } from "./Common";
interface HeaderButtonProps {
    onClick: () => void;
    text: string;
}
interface HeaderButtonState {
}
export declare class HeaderButton extends React.Component<HeaderButtonProps, HeaderButtonState> {
    constructor(props: HeaderButtonProps);
    render(): JSX.Element;
}
export declare class SearchButton extends React.Component<SearchButtonProps, {}> {
    render(): JSX.Element;
}
export declare class BackButton extends React.Component<BackButtonInterface, {}> {
    render(): JSX.Element;
}
export declare class FilterButton extends React.Component<SearchButtonProps, {}> {
    render(): JSX.Element;
}
export declare class EditButton extends React.Component<SearchButtonProps, {}> {
    render(): JSX.Element;
}
export declare class UseButton extends React.Component<SearchButtonProps, {}> {
    render(): JSX.Element;
}
export declare class AddTabButton extends React.Component<SearchButtonProps, {}> {
    render(): JSX.Element;
}
export {};
