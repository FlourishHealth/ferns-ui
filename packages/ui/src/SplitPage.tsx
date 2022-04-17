import React from "react";
import {Box} from "./Box";
import {Color} from "./Common";
import {ErrorBoundary} from "./ErrorBoundary";
import {Spinner} from "./Spinner";
import {Unifier} from "./Unifier";
import {FlatList} from "./FlatList";
import {ListRenderItemInfo, View} from "react-native";
import {mediaQueryLargerThan} from "./MediaQuery";
import {Icon} from "./Icon";
import {IconButton} from "./IconButton";

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
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          extraData={this.props.listViewExtraData}
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
              icon="times"
              accessibilityLabel="close"
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
        avoidKeyboard={true}
        keyboardOffset={this.props.keyboardOffset}
        display="flex"
        width="100%"
        height="100%"
        flex="grow"
        direction="row"
        color={this.props.color || "lightGray"}
      >
        {this.props.loading === true && <Spinner size="md" color={Unifier.theme.darkGray as any} />}
        {this.renderList()}
        {this.renderListContent()}
      </Box>
    );
  }
}
