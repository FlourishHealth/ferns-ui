import React, {Children, useState} from "react";
import {ListRenderItemInfo, View} from "react-native";

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

  if (!children && !renderContent) {
    console.warn("A child node is required");
    return null;
  }

  if (Children.count(children) > 2 && Children.count(children)) {
    console.warn("There must be a tab for each child");
    return null;
  }

  const renderItem = (itemInfo: ListRenderItemInfo<any>) => {
    return (
      <Box
        style={{backgroundColor: "green"}}
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
    return (
      <Box
        alignItems="center"
        color="green"
        direction="row"
        flex="grow"
        justifyContent="center"
        paddingX={2}
      />
    );
  };

  const renderMainContent = () => {
    if (renderContent) {
      return renderListContent();
    } else {
      return renderChildrenContent();
    }
  };

  return (
    <Box
      avoidKeyboard
      color={color || "lightGray"}
      flex="grow"
      height="100%"
      keyboardOffset={keyboardOffset}
      padding={2}
      width="100%"
    >
      {loading === true && <Spinner color={Unifier.theme.darkGray as any} size="md" />}
      {Boolean(selectedId) ? renderMainContent() : renderList()}
    </Box>
  );
};

// {/* {elementArray.map((element, index) => {
//   return (
// 			<ScrollView
// 				key={index}
// 				contentContainerStyle={{
// 					flex: 1,
// 				}}
// 				style={{
// 					flex: 1,
// 					width: "60%",
// 					padding: 3 * SPACING,
// 					height: "100%",
// 				}}
// 				>
// 				{element}
// 				{/* {SwipeContainer()} */}
//         </ScrollView>
//         );
//       })} */}
