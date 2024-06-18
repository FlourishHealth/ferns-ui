import {Box, Button, Toast, useToast} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const ToastDemo = () => {
  return <Toast persistent title="There was an error" variant="error" />;
};

export const Toasts = () => {
  const toast = useToast();
  return (
    <StorybookContainer>
      <Box justifyContent="between" width="100%">
        <Box marginBottom={2}>
          <Toast persistent title="There was an error" variant="error" />
        </Box>
        <Box marginBottom={2}>
          <Toast persistent title="Great success!" variant="success" />
        </Box>
        <Box marginBottom={2}>
          <Toast
            persistent
            size="lg"
            subtitle="Toast text content that's kind of long. La la la la la la la la la la."
            title="Toast title"
            variant="warning"
          />
        </Box>
        <Box marginBottom={2}>
          <Toast
            buttonOnClick={() => {}}
            buttonText="Undo"
            persistent
            size="lg"
            subtitle="Toast text content that's kind of long. La la la la la la la la la la."
            title="Toast With Button"
            variant="info"
          />
        </Box>
      </Box>
      <Box justifyContent="between" marginTop={6} width="100%">
        <Box marginBottom={2}>
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
        </Box>
        <Box marginBottom={2}>
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
        </Box>
        <Box marginBottom={2}>
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
      </Box>
      <Box justifyContent="between" marginTop={6} width="100%">
        <Box marginBottom={2}>
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
        </Box>
        <Box marginBottom={2}>
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
        </Box>
        <Box marginBottom={2}>
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
      </Box>
    </StorybookContainer>
  );
};
