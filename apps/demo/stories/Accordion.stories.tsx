import {Accordion, Box, Heading, isMobileDevice, Text} from "ferns-ui";
import React from "react";
import {View} from "react-native";

export const AccordionDemo = () => {
  return (
    <>
      <Accordion isCollapsed title="Accordion Title 1">
        <Box>
          <Text>Some children content</Text>
        </Box>
      </Accordion>
      <Accordion isCollapsed title="Accordion Title 2">
        <Box>
          <Text>Some more children content</Text>
        </Box>
      </Accordion>
    </>
  );
};

export const AccordionDevDemo = () => {
  const isMobile = isMobileDevice();
  const InfoChild = () => {
    return (
      <Box>
        <Text>Some children content</Text>
      </Box>
    );
  };
  return (
    <View style={{width: isMobile ? "100%" : "50%", backgroundColor: "white"}}>
      <View style={{width: "100%", padding: 15}}>
        <Accordion
          includeInfoModal
          infoModalChildren={<InfoChild />}
          infoModalSubtitle="Info Modal Subtitle"
          infoModalTitle="Info Modal Title"
          title="Accordion Title"
        >
          <Box>
            <Heading size="sm">Some children content</Heading>
            <Text>Some more children content</Text>
          </Box>
        </Accordion>
      </View>
    </View>
  );
};

export const AccordionOnToggleDemo = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [title, setTitle] = React.useState("Sm Title");
  const isMobile = isMobileDevice();

  return (
    <View style={{width: isMobile ? "100%" : isCollapsed ? 150 : 450, backgroundColor: "white"}}>
      <View style={{width: "100%", padding: 15}}>
        <Accordion
          isCollapsed={isCollapsed}
          onToggle={(isCollapse: boolean) => {
            setIsCollapsed(isCollapse);
            setTitle(isCollapse ? "Sm T" : "Longer Title With On Toggle");
          }}
          title={title}
        >
          <Box>
            <Heading size="sm">Custom Width setting set by onToggle Callback</Heading>
            <Text>Allows dynamic width adjustment</Text>
          </Box>
        </Accordion>
      </View>
    </View>
  );
};
