import {Box, Button, Modal, ModalProps, Text} from "ferns-ui";
import React, {useState} from "react";

export const ModalDemo = (props: Partial<ModalProps>) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Box paddingY={1}>
      <Button text="Default Modal" onClick={() => setShowModal(true)} />
      <Modal
        primaryButtonOnClick={() => setShowModal(false)}
        primaryButtonText="Accept"
        secondaryButtonOnClick={() => setShowModal(false)}
        subTitle="Sub heading"
        text="This is the text of the modal."
        title="Demo modal"
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        {...props}
      />
    </Box>
  );
};

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
        <Box paddingY={1}>
          <Button text="Default/ Small Modal" onClick={() => setModalToShow("default")} />
        </Box>
        <Box paddingY={1}>
          <Button text="Medium Modal" onClick={() => setModalToShow("md")} />
        </Box>
        <Box paddingY={1}>
          <Button text="Large Modal" onClick={() => setModalToShow("lg")} />
        </Box>
        <Box paddingY={1}>
          <Button text="Large Modal" onClick={() => setModalToShow("lg")} />
        </Box>
        <Box paddingY={1}>
          <Button text="Secondary Button Modal" onClick={() => setModalToShow("secondary")} />
        </Box>
      </Box>
      <Modal
        primaryButtonOnClick={() => setModalToShow("")}
        primaryButtonText="Accept"
        secondaryButtonOnClick={() => {}}
        secondaryButtonText={modalToShow === "secondary" ? "Secondary" : undefined}
        size={size as "sm" | "md" | "lg"}
        subTitle="Sub heading"
        text="This is the text of the modal."
        title={`${modalToShow} modal`}
        visible={
          modalToShow === "default" ||
          modalToShow === "md" ||
          modalToShow === "lg" ||
          modalToShow === "secondary"
        }
        onDismiss={() => setModalToShow("")}
      >
        <Text>Children inside the modal.</Text>
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
