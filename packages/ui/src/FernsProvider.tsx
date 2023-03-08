import React from "react";
import {Host} from "react-native-portalize";
import {ToastProvider} from "react-native-toast-notifications";

import {Toast} from "./Toast";

export function FernsProvider({children}: {children: React.ReactNode}): React.ReactElement {
  return (
    <ToastProvider
      animationDuration={250}
      animationType="slide-in"
      duration={50000}
      offset={50}
      placement="bottom"
      renderToast={(toastOptions) => <Toast {...(toastOptions as any)} />}
      swipeEnabled
    >
      <Host>{children}</Host>
    </ToastProvider>
  );
}
