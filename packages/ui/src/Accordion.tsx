import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, {FC, useEffect, useState} from "react";
import {Pressable, View} from "react-native";

import {AccordionProps} from "./Common";
import {Heading} from "./Heading";
import {Modal} from "./Modal";
import {Text} from "./Text";
import {useTheme} from "./Theme";

export const Accordion: FC<AccordionProps> = ({
  children,
  isCollapsed = false,
  title,
  subtitle,
  includeInfoModal = false,
  infoModalChildren,
  infoModalSubtitle,
  infoModalText,
  infoModalTitle,
}) => {
  const {theme} = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [infoModalVisibleState, setInfoModalVisibleState] = useState(false);

  // The external collapse state should override the internal collapse state.
  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <>
      <Modal
        primaryButtonOnClick={() => setInfoModalVisibleState(false)}
        primaryButtonText="Close"
        size="md"
        subtitle={infoModalSubtitle}
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
          <View style={{flexDirection: "column", gap: 4}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Heading>{title}</Heading>
              {includeInfoModal && infoModalTitle && (
                <Pressable
                  accessibilityRole="button"
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  style={{marginLeft: 8}}
                  onPress={() => setInfoModalVisibleState(true)}
                >
                  <Heading color="secondaryLight" size="sm">
                    ⓘ
                  </Heading>
                </Pressable>
              )}
            </View>
            {subtitle && <Text>{subtitle}</Text>}
          </View>
          <View>
            <Pressable
              accessibilityRole="button"
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              onPress={() => setCollapsed(!collapsed)}
            >
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
