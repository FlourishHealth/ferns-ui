import React from "react";
interface ErrorPageProps {
    error: Error;
    resetError: () => void;
}
export declare class ErrorPage extends React.Component<ErrorPageProps, {}> {
    constructor(props: ErrorPageProps);
    render(): JSX.Element;
}
export {};
