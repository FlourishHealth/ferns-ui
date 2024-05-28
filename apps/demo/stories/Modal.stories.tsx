import {DemoConfiguration} from "@config";
import {Box, Button, Modal, Text} from "ferns-ui";
import React, {useState} from "react";

import {DefaultDemo} from "./DefaultDemo";

const Modals = () => {
  const [modalToShow, setModalToShow] = useState<string>("");
  let size = "sm";
  if (modalToShow === "md") {
    size = "md";
  } else if (modalToShow === "lg") {
    size = "lg";
  }
  return (
    <>
      <Box>
        <Button text="Default modal" onClick={() => setModalToShow("default")} />
        <Button text="Start aligned modal" onClick={() => setModalToShow("start")} />
        <Button text="Medium modal" onClick={() => setModalToShow("md")} />
        <Button text="Large modal" onClick={() => setModalToShow("lg")} />
        <Button text="Secondary modal" onClick={() => setModalToShow("secondary")} />
        <Button text="Custom footer" onClick={() => setModalToShow("footer")} />
      </Box>
      <Modal
        align={modalToShow === "start" ? "start" : "center"}
        heading={`${modalToShow} modal`}
        primaryButtonOnClick={() => setModalToShow("")}
        primaryButtonText="Accept"
        secondaryButtonOnClick={() => {}}
        secondaryButtonText={modalToShow === "secondary" ? "Secondary" : undefined}
        showClose
        size={size as "sm" | "md" | "lg"}
        subHeading="Sub heading"
        visible={
          modalToShow === "default" ||
          modalToShow === "start" ||
          modalToShow === "md" ||
          modalToShow === "lg" ||
          modalToShow === "secondary"
        }
        onDismiss={() => setModalToShow("")}
      >
        <Text align={modalToShow === "start" ? undefined : "center"}>Some text for the modal</Text>
      </Modal>
      <Modal
        footer={
          <Box color="red" padding={2} width="100%">
            <Button color="primary" text="Big Button" onClick={() => setModalToShow("")} />
          </Box>
        }
        heading="Custom footer"
        primaryButtonText="hi"
        visible={modalToShow === "footer"}
        onDismiss={() => setModalToShow("")}
      >
        <Text align="center">Some text for the modal</Text>
      </Modal>
    </>
  );
};

export const ModalStories = {
  title: "Modal",
  component: Modal,
  stories: {
    Modals: () => <Modals />,
  },
};

// TODO: might want to combine these two. They're different figma components, but the same for dev.
// export const InnerModalContentConfiguration: DemoConfiguration = { name: "Inner modal content",
// component: InnerModalContent, related: ["Modals"], description:
// "This component populates the interior of standard modals.
// This component uses the custom content block – see how to use that by clicking here.", a11yNotes:
// [], category: ["Layout", "Utility"], status: { documentation: "ready", figma: "ready", figmaLink: "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24093&mode=design&t=iCiJI3xbrm6rrXPg-1",
// ios: "ready", android: "ready", web: "ready", }, additionalDocumentation: [], interfaceName:
// "InnerModalContentProps", usage: { do: [ "Use the right variant for the device you’re designing
// for (desktop, mobile).", "Center align your content when there’s 1-2 sentences;
// left align when there’s more. Longform content is easier to skim when it’s left aligned.", ],
// doNot: [ "Do not detach the instance in order to change the content. Instead,
// use the instance swap property to change out the custom content block.", ], }, props: {}, demo:
// (props) => <InnerModalContentDemo {...props} />, demoOptions: {}, stories: {},
// testMatrixDefaultProps: {}, };

export const ModalConfiguration: DemoConfiguration = {
  name: "Modal",
  component: Modal,
  related: ["Date / time modal", "Custom content block"],
  description:
    "A Modal displays content that requires user interaction. Modals appear on a layer above the page and therefore block the content underneath, preventing users from interacting with anything else besides the Modal. Modal should be used to gather short bits of information from the user. Also known as dialog or prompt.",
  shortDescription:
    "A Modal displays content that requires user interaction. Modals appear on a layer above the page and therefore block the content underneath",
  a11yNotes: [
    "Modals should have labels so that they have a clear purpose when being read by a screen reader.",
    "accessibilityModalLabel allows us to update the spoken text for the heading prop and give it more context.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24105&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "ModalProps",
  usage: {
    do: [
      "Interrupt users to get confirmation on a user-triggered action.",
      "Request minimal amounts of information.",
      "Capture the user’s full attention.",
      "Use the appropriate size for the appropriate device; desktop modals can be small, medium, or large, but mobile modals should always use the sheet style.",
    ],
    doNot: [
      "Don’t use this to request longform information; instead, use a separate page.",
      "On top of another modal.",
      "For an action that should NOT interrupt a user from their current work stream.",
    ],
  },
  props: {},
  demo: DefaultDemo,
  demoOptions: {},
  stories: {
    Modals: {render: Modals},
  },
};
