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
          <Toast
            persistent
            title="Default toast with a pretty long toast message. This is getting pretty long at this point. "
          />
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
      </Box>
      <Box justifyContent="between" marginTop={6} width="100%">
        <Box marginBottom={2}>
          <Button
            text="Default Toast"
            onClick={() => {
              toast.show("Default Toast");
            }}
          />
        </Box>
        <Box marginBottom={2}>
          <Button
            text="Success Toast"
            onClick={() => {
              toast.show("Default Toast", {variant: "success"});
            }}
          />
        </Box>
        <Box marginBottom={2}>
          <Button
            text="Warning Toast"
            onClick={() => {
              toast.show("Warning Toast", {variant: "warning"});
            }}
          />
        </Box>
        <Box marginBottom={2}>
          <Button
            text="Error Toast"
            onClick={() => {
              toast.show("Error Toast", {variant: "error"});
            }}
          />
        </Box>
        <Box marginBottom={2}>
          <Button
            text="Long Toast"
            onClick={() => {
              toast.show(
                "Thanks for doing the thing we asked. You have successfully done the thing. Congrats! You are wonderful!"
              );
            }}
          />
        </Box>
      </Box>
    </StorybookContainer>
  );
};
