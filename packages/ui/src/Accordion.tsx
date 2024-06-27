import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, {FC, useContext, useState} from "react";
import {Pressable, View} from "react-native";

import {AccordionProps} from "./Common";
import {Heading} from "./Heading";
import {Modal} from "./Modal";
import {ThemeContext} from "./Theme";

export const Accordion: FC<AccordionProps> = ({
  children,
  isCollapsed = false,
  title,
  includeInfoModal = false,
  infoModalChildren,
  infoModalSubTitle,
  infoModalText,
  infoModalTitle,
}) => {
  const {theme} = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [infoModalVisibleState, setInfoModalVisibleState] = useState(false);

  return (
    <>
      <Modal
        primaryButtonOnClick={() => setInfoModalVisibleState(false)}
        primaryButtonText="Close"
        size="md"
        subTitle={infoModalSubTitle}
        text={infoModalText}
        title={infoModalTitle}
        visible={infoModalVisibleState}
        onDismiss={() => setInfoModalVisibleState(false)}
      >
        {infoModalChildren}
      </Modal>
      <View
        style={{
          padding: 16,
          borderBottomColor: theme.border.default,
          borderTopColor: theme.border.default,
          borderTopWidth: 2,
          borderBottomWidth: 2,
          width: "100%",
        }}
      >
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Heading>{title}</Heading>
            {includeInfoModal && (
              <Pressable
                accessibilityRole="button"
                style={{marginLeft: 8}}
                onPress={() => setInfoModalVisibleState(true)}
              >
                <Heading color="secondaryLight" size="sm">
                  ⓘ
                </Heading>
                {/* TODO: Figure out why FontAwesome6 'light' is not working */}
                {/* <FontAwesome6 color={theme.text.secondaryLight} light name="circle-info" size={16}  light="circle-info"/> */}
              </Pressable>
            )}
          </View>
          <View>
            <Pressable accessibilityRole="button" onPress={() => setCollapsed(!collapsed)}>
              <FontAwesome6
                color={theme.text.link}
                name={collapsed ? "chevron-down" : "chevron-up"}
                size={16}
              />
            </Pressable>
          </View>
        </View>
        {collapsed ? null : <View style={{marginTop: 8}}>{children}</View>}
      </View>
    </>
  );
};
