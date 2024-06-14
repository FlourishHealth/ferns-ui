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
        <Button text="Medium modal" onClick={() => setModalToShow("md")} />
        <Button text="Large modal" onClick={() => setModalToShow("lg")} />
        <Button text="Secondary modal" onClick={() => setModalToShow("secondary")} />
      </Box>
      <Modal
        primaryButtonOnClick={() => setModalToShow("")}
        primaryButtonText="Accept"
        secondaryButtonOnClick={() => {}}
        secondaryButtonText={modalToShow === "secondary" ? "Secondary" : undefined}
        size={size as "sm" | "md" | "lg"}
        subTitle="Sub heading"
        title={`${modalToShow} modal`}
        visible={
          modalToShow === "default" ||
          modalToShow === "md" ||
          modalToShow === "lg" ||
          modalToShow === "secondary"
        }
        onDismiss={() => setModalToShow("")}
      >
        <Text>Some text for the modal</Text>
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
