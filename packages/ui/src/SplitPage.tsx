import React from "react";
import {ListRenderItemInfo, View} from "react-native";

import {Box} from "./Box";
import {Color} from "./Common";
import {ErrorBoundary} from "./ErrorBoundary";
import {FlatList} from "./FlatList";
import {Icon} from "./Icon";
import {IconButton} from "./IconButton";
import {mediaQueryLargerThan} from "./MediaQuery";
import {Spinner} from "./Spinner";
import {Unifier} from "./Unifier";

interface SplitPageProps {
  // TODO: figure out navigation
  navigation: any;
  loading?: boolean;
  color?: Color;
  keyboardOffset?: number;
  rightButton?: string;
  rightButtonOnClick?: () => void;
  renderListViewItem: (itemInfo: ListRenderItemInfo<any>) => React.ReactElement | null;
  renderListViewHeader?: () => React.ReactElement | null;
  renderContent: (index?: number) => React.ReactElement | null;
  listViewData: any[];
  listViewExtraData?: any;
  listViewWidth?: number;
}

interface SplitPageState {
  selectedId?: number;
}

// A component for rendering a list on one side and a details view on the right for large screens,
// and a scrollable list where clicking an item takes you the details view.
export class SplitPage extends React.Component<SplitPageProps, SplitPageState> {
  state = {selectedId: undefined};

  actionSheetRef: React.RefObject<any> = React.createRef();

  renderItem = (itemInfo: ListRenderItemInfo<any>) => {
    return (
      <Box
        onClick={() => {
          this.setState({selectedId: itemInfo.index});
        }}
      >
        {this.props.renderListViewItem(itemInfo)}
      </Box>
    );
  };

  renderList = () => {
    if (!mediaQueryLargerThan("sm") && this.state.selectedId) {
      return null;
    }
    return (
      <View
        style={{
          width: mediaQueryLargerThan("sm") ? this.props.listViewWidth ?? 300 : "100%",
          maxWidth: mediaQueryLargerThan("sm") ? this.props.listViewWidth ?? 300 : "100%",
          flexGrow: 1,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {this.props.renderListViewHeader && this.props.renderListViewHeader()}
        <FlatList
          data={this.props.listViewData}
          extraData={this.props.listViewExtraData}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  };

  renderListContent = () => {
    return (
      <Box flex="grow" padding={2}>
        {!mediaQueryLargerThan("sm") && (
          <Box width="100%">
            <IconButton
              accessibilityLabel="close"
              icon="times"
              iconColor="darkGray"
              onClick={() => this.setState({selectedId: undefined})}
            />
          </Box>
        )}
        {this.props.renderContent(this.state.selectedId)}
      </Box>
    );
  };

  render() {
    return (
      <Box
        avoidKeyboard
        color={this.props.color || "lightGray"}
        direction="row"
        display="flex"
        flex="grow"
        height="100%"
        keyboardOffset={this.props.keyboardOffset}
        width="100%"
      >
        {this.props.loading === true && <Spinner color={Unifier.theme.darkGray as any} size="md" />}
        {this.renderList()}
        {this.renderListContent()}
      </Box>
    );
  }
}
