import React, {FC} from "react";
import {Host} from "react-native-portalize";
import {ToastProvider} from "react-native-toast-notifications";

import {OpenAPIProvider} from "./OpenAPIContext";
import {ThemeProvider} from "./Theme";
import {Toast} from "./Toast";

export const FernsProvider: FC<{
  children: React.ReactNode;
  openAPISpecUrl?: string;
}> = ({
  children,
  openAPISpecUrl,
}) => {
  return (
    <ThemeProvider>
      <ToastProvider
        animationDuration={250}
        animationType="slide-in"
        duration={50000}
        offset={50}
        placement="bottom"
        renderToast={(toastOptions) => <Toast {...toastOptions?.data} />}
        swipeEnabled
      >
        <OpenAPIProvider specUrl={openAPISpecUrl}>
          <Host>{children}</Host>
        </OpenAPIProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
