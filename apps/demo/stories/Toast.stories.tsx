import {StorybookContainer} from "@components";
import {Box, Button, useToast} from "ferns-ui";
import React from "react";

export const ToastDemo = () => {
  const toast = useToast();
  return (
    <StorybookContainer>
      <Button
        text="Show Toast"
        onClick={() => {
          toast.show("Toast message");
        }}
      />
    </StorybookContainer>
  );
};

export const Toasts = () => {
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
          text="Persistent"
          onClick={() => {
            const id = toast.show("Persistent Toast", {
              persistent: true,
              onDismiss: () => {
                toast.hide(id);
              },
            });
          }}
        />
      </Box>
    </StorybookContainer>
  );
};
