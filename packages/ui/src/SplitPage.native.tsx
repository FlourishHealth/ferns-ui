import React, {Children, useState} from "react";
import {Dimensions, ListRenderItemInfo, View} from "react-native";
import {SwiperFlatList} from "react-native-swiper-flatlist";

import {Box} from "./Box";
import {SplitPageProps} from "./Common";
import {FlatList} from "./FlatList";
import {IconButton} from "./IconButton";
import {Spinner} from "./Spinner";
import {Unifier} from "./Unifier";

export const SplitPage = ({
  children,
  loading = false,
  color,
  keyboardOffset,
  renderListViewItem,
  renderListViewHeader,
  renderContent,
  onSelectionChange = () => {},
  listViewData,
  listViewExtraData,
}: SplitPageProps) => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const elementArray = Children.toArray(children);
  const {width} = Dimensions.get("window");

  if (!children && !renderContent) {
    console.warn("A child node is required");
    return null;
  }

  const renderItem = (itemInfo: ListRenderItemInfo<any>) => {
    return (
      <Box
        onClick={() => {
          console.log({itemInfo});
          Unifier.utils.haptic();
          setSelectedId(itemInfo.index);
          onSelectionChange(itemInfo);
        }}
      >
        {renderListViewItem(itemInfo)}
      </Box>
    );
  };

  const renderList = () => {
    if (selectedId !== undefined) {
      return null;
    }

    return (
      <View
        style={{
          width: "100%",
          maxWidth: "100%",
          flexGrow: 1,
          flexShrink: 0,
          display: "flex",
          paddingTop: parseFloat("12px"),
          paddingBottom: parseFloat("12px"),
          flexDirection: "column",
        }}
      >
        {renderListViewHeader && renderListViewHeader()}
        {/* <ScrollView>
          {listViewData.map((item, index) => {
            console.log({item});
            return renderItem({item, index});
          })}
        </ScrollView> */}
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
    if (selectedId === undefined) {
      return null;
    }
    return (
      <Box flex="grow" padding={2}>
        <Box width="100%">
          <IconButton
            accessibilityLabel="close"
            icon="times"
            iconColor="darkGray"
            onClick={() => setSelectedId(undefined)}
          />
        </Box>
        {renderContent && renderContent(selectedId)}
      </Box>
    );
  };

  const renderChildrenContent = () => {
    if (selectedId === undefined) {
      return null;
    }
    return (
      <SwiperFlatList nestedScrollEnabled renderAll showPagination style={{width: "100%"}}>
        {elementArray.map((element, i) => {
          return (
            <View
              key={i}
              style={{width, height: elementArray.length > 1 ? "95%" : "100%", padding: 4}}
            >
              {element}
            </View>
          );
        })}
      </SwiperFlatList>
    );
  };

  const renderMainContent = renderContent ? renderListContent() : renderChildrenContent();

  return (
    <Box
      avoidKeyboard
      color={color || "lightGray"}
      flex="grow"
      height="100%"
      keyboardOffset={keyboardOffset}
      width="100%"
    >
      {loading === true && <Spinner color={Unifier.theme.darkGray as any} size="md" />}
      {selectedId === undefined ? renderList() : renderMainContent}
    </Box>
  );
};
