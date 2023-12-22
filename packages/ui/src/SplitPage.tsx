import React, {Children, useCallback, useContext, useEffect, useState} from "react";
import {ListRenderItemInfo, View} from "react-native";

import {Box} from "./Box";
import {SplitPageProps} from "./Common";
import {FlatList} from "./FlatList";
import {IconButton} from "./IconButton";
import {isMobileDevice} from "./MediaQuery";
import {Spinner} from "./Spinner";
import {Swiper} from "./Swiper";
import {ThemeContext} from "./Theme";

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
  onSelectionChange = () => {},
  listViewData,
  listViewExtraData,
  listViewWidth,
  bottomNavBarHeight,
  showItemList,
  selectLimit,
}: SplitPageProps) => {
  const {theme} = useContext(ThemeContext);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const elementArray = Children.toArray(children).filter((c) => c !== null);
  const onItemSelect = useCallback(
    async (item: ListRenderItemInfo<any>): Promise<void> => {
      setSelectedId(item.index);
      await onSelectionChange(item);
    },
    [onSelectionChange]
  );

  const onItemDeselect = useCallback(async () => {
    setSelectedId(undefined);
    await onSelectionChange(undefined);
  }, [onSelectionChange]);

  useEffect(() => {
    if (showItemList) {
      void onItemDeselect();
    }
  }, [showItemList, onItemDeselect]);

  if (!children && !renderContent) {
    console.warn("A child node is required for SplitPage");
    return null;
  }

  if (elementArray.length > 2 && elementArray.length !== tabs.length) {
    console.warn("There must be a tab for each child");
    return null;
  }

  const renderItem = (itemInfo: ListRenderItemInfo<any>) => {
    return (
      <Box
        onClick={async () => {
          await onItemSelect(itemInfo);
        }}
      >
        {renderListViewItem(itemInfo)}
      </Box>
    );
  };

  const renderList = () => {
    return (
      <View
        style={{
          width: listViewWidth ?? 300,
          maxWidth: listViewWidth ?? 300,
          flexGrow: 1,
          // flexShrink: 0,
          display: "flex",
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
        {renderContent?.(selectedId)}
      </Box>
    );
  };

  const renderMobileList = () => {
    if (isMobileDevice() && selectedId !== undefined) {
      return null;
    }

    return (
      <View
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          flexGrow: 1,
          // flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {renderListViewHeader && renderListViewHeader()}
        <FlatList
          data={listViewData}
          extraData={listViewExtraData}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled
          renderItem={renderItem}
        />
      </View>
    );
  };

  const renderMobileListContent = () => {
    if (isMobileDevice() && selectedId === undefined) {
      return null;
    }

    return (
      <Box flex="grow" padding={2}>
        {isMobileDevice() && (
          <Box width="100%">
            <IconButton
              accessibilityLabel="close"
              icon="times"
              iconColor="darkGray"
              onClick={() => onItemDeselect()}
            />
          </Box>
        )}
        {renderContent && renderContent(selectedId)}
      </Box>
    );
  };

  const renderSplitPage = () => {
    return (
      <>
        {renderList()}
        {renderContent ? (
          renderListContent()
        ) : (
          <Swiper
            bottomNavBarHeight={bottomNavBarHeight}
            selectLimit={selectLimit}
            selectedId={selectedId}
            tabs={tabs}
          >
            {children}
          </Swiper>
        )}
      </>
    );
  };

  const renderMobileSplitPage = () => {
    const renderMainContent = renderContent ? (
      renderMobileListContent()
    ) : (
      <Swiper
        bottomNavBarHeight={bottomNavBarHeight}
        selectLimit={selectLimit}
        selectedId={selectedId}
        tabs={tabs}
      >
        {children}
      </Swiper>
    );
    return selectedId === undefined ? renderMobileList() : renderMainContent;
  };

  return (
    <Box
      avoidKeyboard
      color={color || "lightGray"}
      direction="row"
      display="flex"
      height="100%"
      keyboardOffset={keyboardOffset}
      padding={2}
      width="100%"
    >
      {loading === true && <Spinner color={theme.darkGray as any} size="md" />}
      {isMobileDevice() ? renderMobileSplitPage() : renderSplitPage()}
    </Box>
  );
};
