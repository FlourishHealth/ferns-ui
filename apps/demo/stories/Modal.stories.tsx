import {Box, Button, Modal, Text} from "ferns-ui";
import React, {useState} from "react";

export const Modals = () => {
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
