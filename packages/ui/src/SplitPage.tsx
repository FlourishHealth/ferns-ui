import React, {Children, useState} from "react";
import {ListRenderItemInfo, ScrollView, View} from "react-native";

import {Box} from "./Box";
import {SPACING, SplitPageProps} from "./Common";
import {FlatList} from "./FlatList";
import {IconButton} from "./IconButton";
import {mediaQueryLargerThan} from "./MediaQuery";
import {SegmentedControl} from "./SegmentedControl";
import {Spinner} from "./Spinner";
import {Unifier} from "./Unifier";

// A component for rendering a list on one side and a details view on the right for large screens,
// and a scrollable list where clicking an item takes you the details view.
export const SplitPage = ({
  children,
  tabs = [],
  loading = false,
  color,
  keyboardOffset,
  renderListViewItem,
  renderListViewHeader,
  renderContent,
  listViewData,
  listViewExtraData,
  listViewWidth,
}: SplitPageProps) => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [activeTabs, setActiveTabs] = useState<number[]>(tabs.length > 2 ? [0, 1] : []);

  const elementArray = Children.toArray(children);

  if (!children && !renderContent) {
    console.warn("A child node is required");
    return null;
  }

  if (Children.count(children) > 2 && Children.count(children) !== tabs.length) {
    console.warn("There must be a tab for each child");
    return null;
  }

  const renderItem = (itemInfo: ListRenderItemInfo<any>) => {
    return (
      <Box
        onClick={() => {
          setSelectedId(itemInfo.index);
        }}
      >
        {renderListViewItem(itemInfo)}
      </Box>
    );
  };

  const renderList = () => {
    if (!mediaQueryLargerThan("sm") && selectedId) {
      return null;
    }
    return (
      <View
        style={{
          width: mediaQueryLargerThan("sm") ? listViewWidth ?? 300 : "100%",
          maxWidth: mediaQueryLargerThan("sm") ? listViewWidth ?? 300 : "100%",
          flexGrow: 1,
          flexShrink: 0,
          display: "flex",
          paddingTop: "12px",
          paddingBottom: "12px",
          flexDirection: "column",
        }}
      >
        {renderListViewHeader && renderListViewHeader()}
        <FlatList
          data={listViewData}
          extraData={listViewExtraData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const renderListContent = () => {
    return (
      <Box flex="grow" padding={2}>
        {!mediaQueryLargerThan("sm") && (
          <Box width="100%">
            <IconButton
              accessibilityLabel="close"
              icon="times"
              iconColor="darkGray"
              onClick={() => setSelectedId(undefined)}
            />
          </Box>
        )}
        {renderContent && renderContent(selectedId)}
      </Box>
    );
  };

  const renderChildrenContent = () => {
    if (Array.isArray(children) && children.length > 2) {
      return (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Box paddingX={4} paddingY={2} width="100%">
            <SegmentedControl
              items={tabs}
              multiselect
              selectLimit={tabs.length}
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
            paddingX={2}
            width={activeTabs.length > 1 ? "100%" : "60%"}
          >
            {activeTabs.map((tabIndex) => {
              return (
                <ScrollView
                  key={tabIndex}
                  contentContainerStyle={{
                    flex: 1,
                  }}
                  style={{
                    flex: 1,
                    width: "60%",
                    padding: 3 * SPACING,
                    height: "100%",
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
        <Box alignItems="center" direction="row" flex="grow" justifyContent="center" paddingX={2}>
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
                  padding: 3 * SPACING,
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
  };

  return (
    <Box
      avoidKeyboard
      color={color || "lightGray"}
      direction="row"
      display="flex"
      flex="grow"
      height="100%"
      keyboardOffset={keyboardOffset}
      padding={2}
      width="100%"
    >
      {loading === true && <Spinner color={Unifier.theme.darkGray as any} size="md" />}
      {renderList()}
      {renderContent ? renderListContent() : renderChildrenContent()}
    </Box>
  );
};
