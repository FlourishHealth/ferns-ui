import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Button, Toast, useToast} from "ferns-ui";
import React from "react";

const ToastDemo = () => {
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

export const ToastConfiguration: DemoConfiguration = {
  name: "Toast",
  component: Toast, // Replace with actual component reference
  related: ["Banners"],
  description:
    "Toasts are brief and small messages that overlay content, but do not block the user’s flow, as they are out of the way and ephemeral. Toasts do not require user action and primarily acknowledge that a user has performed an action or completed a task. Also known as 'snackbar'.",
  shortDescription:
    "Toasts are brief and small messages that overlay content, but do not block the user’s flow, as they are out of the way and ephemeral.",
  a11yNotes: ["Toasts should be on the screen for a minimum of 5 seconds."],
  category: ["Feedback", "Notification"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23406&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "ToasterProps",
  usage: {
    do: [
      "Use a toaster when you want to briefly acknowledge a users action without interrupting their flow.",
      "Acknowledge an action that relates to another surface, providing a link that navigates the user to that surface.",
      "Provide a way to undo actions.",
      "Provide quick information on system processes.",
    ],
    doNot: [
      "Do not use a toaster if there is a crucial error that’s blocking the flow; consider using error messages, modals, or banners instead.",
      "For confirmation on an action; consider a modal instead.",
      "For upsells, FYIs, or promotional content; consider a banner instead.",
      "To guide or educate the user.",
    ],
  },
  props: {},
  demo: ToastDemo,
  demoOptions: {},
  stories: {
    Toasts: {render: Toasts},
  },
  testMatrix: {},
  testMatrixDefaultProps: {},
};
