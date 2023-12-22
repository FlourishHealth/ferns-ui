import React, {Children, useState} from "react";
import {Dimensions, ScrollView, View} from "react-native";
import {SwiperFlatList} from "react-native-swiper-flatlist";

import {Box} from "./Box";
import {isMobileDevice} from "./MediaQuery";
import {SegmentedControl} from "./SegmentedControl";

interface SwiperProps {
  selectedId?: number;
  children: React.ReactNode;
  bottomNavBarHeight?: number;
  /**
   * The names of the tabs that will be generated per ReactChild provided. Tabs will not be generated if renderContent is provided in place of children
   */
  tabs?: string[];
  // The select limit for the number of tabs that can be selected
  selectLimit?: number;
}
export const Swiper = ({
  selectedId,
  children,
  bottomNavBarHeight,
  selectLimit,
  tabs = [],
}: SwiperProps): React.ReactElement | null => {
  const [activeTabs, setActiveTabs] = useState<number[]>([0, 1]);

  const {width} = Dimensions.get("window");
  const elementArray = Children.toArray(children).filter((c) => c !== null);

  if (isMobileDevice()) {
    if (selectedId === undefined) {
      return null;
    }
    return (
      <SwiperFlatList
        nestedScrollEnabled
        paginationStyle={{justifyContent: "center", width: "100%"}}
        renderAll={false}
        showPagination
        style={{width, height: "100%", display: "flex"}}
      >
        {elementArray.map((element, i) => {
          return (
            <View
              key={i}
              style={{
                // TODO this needs to be 100% to make the patient page work, but it breaks the staff page
                // width,
                paddingTop: 4,
                paddingLeft: 8,
                paddingRight: 8,
                height: elementArray.length > 1 ? "100%" : "100%",
                paddingBottom: bottomNavBarHeight,
                display: "flex",
              }}
            >
              {element}
            </View>
          );
        })}
      </SwiperFlatList>
    );
  } else {
    if (Array.isArray(children) && elementArray.length > 2) {
      return (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Box marginBottom={4} paddingX={4} width="100%">
            <SegmentedControl
              items={tabs}
              multiselect
              selectLimit={selectLimit || tabs.length}
              selectedItemIndexes={activeTabs}
              onChange={(index) => {
                setActiveTabs([...(index.activeIndex as number[])]);
              }}
            />
          </Box>
          <Box
            direction="row"
            flex="grow"
            height="100%"
            paddingX={4}
            width={activeTabs.length > 1 ? "100%" : "60%"}
          >
            {activeTabs.map((tabIndex, i) => {
              return (
                <ScrollView
                  key={tabIndex}
                  contentContainerStyle={{
                    flex: 1,
                  }}
                  style={{
                    flex: 1,
                    width: "60%",
                    height: "100%",
                    paddingRight: i ? 0 : 16,
                    paddingLeft: i ? 16 : 0,
                  }}
                >
                  {elementArray[tabIndex]}
                </ScrollView>
              );
            })}
          </Box>
        </View>
      );
    } else {
      return (
        <Box
          alignItems="center"
          direction="row"
          flex="grow"
          height="100%"
          justifyContent="center"
          paddingX={2}
        >
          {elementArray.map((element, index) => {
            return (
              <ScrollView
                key={index}
                contentContainerStyle={{
                  flex: 1,
                }}
                style={{
                  flex: 1,
                  width: "60%",
                  height: "100%",
                }}
              >
                {element}
              </ScrollView>
            );
          })}
        </Box>
      );
    }
  }
};
