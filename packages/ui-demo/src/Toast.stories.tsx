import {Box, Button, Toast, useToast} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

const Toasts = () => {
  const toast = useToast();
  return (
    <StorybookContainer>
      <Box justifyContent="between" width="100%">
        <Button
          text="Normal"
          onClick={() => {
            toast.show("Normal Toast");
          }}
        />
        <Button
          text="Warning"
          onClick={() => {
            toast.show("Warning Toast", {variant: "warning"});
          }}
        />
        <Button
          text="Error"
          onClick={() => {
            toast.show("Error Toast", {variant: "error"});
          }}
        />
      </Box>
      <Box justifyContent="between" marginTop={6} width="100%">
        <Button
          text="Normal Button"
          onClick={() => {
            toast.show("Normal Toast", {
              buttonText: "Undo",
              buttonOnClick: () => {
                console.info("Undo");
              },
            });
          }}
        />
        <Button
          text="Warning Button"
          onClick={() => {
            toast.show("Warning Toast", {
              variant: "warning",
              buttonText: "Undo",
              buttonOnClick: () => {
                console.info("Undo");
              },
            });
          }}
        />
        <Button
          text="Error Button"
          onClick={() => {
            toast.show("Error Toast", {
              variant: "error",
              buttonText: "Undo",
              buttonOnClick: () => {
                console.info("Undo");
              },
            });
          }}
        />
      </Box>
      <Box justifyContent="between" marginTop={6} width="100%">
        <Button
          text="Long Button"
          onClick={() => {
            toast.show(
              "Thanks for doing the thing we asked. You have successfully done the thing. Congrats! You are wonderful!",
              {
                buttonText: "Undo",
                buttonOnClick: () => {
                  console.info("Undo");
                },
              }
            );
          }}
        />
        <Button
          text="Long Warning Button"
          onClick={() => {
            toast.show(
              "Thanks for doing the thing we asked. You have done the thing but there was a warning. We will now tell you the warning. ",
              {
                variant: "warning",
                buttonText: "Undo",
                buttonOnClick: () => {
                  console.info("Undo");
                },
              }
            );
          }}
        />
        <Button
          text="Dismissable "
          onClick={() => {
            const id = toast.show("Normal Toast", {
              buttonText: "X",
              buttonOnClick: () => {
                toast.hide(id);
              },
              duration: 0,
            });
          }}
        />
      </Box>
    </StorybookContainer>
  );
};

export const ToastStories = {
  title: "Toast",
  component: Toast,
  stories: {
    Toasts() {
      return <Toasts />;
    },
  },
};
