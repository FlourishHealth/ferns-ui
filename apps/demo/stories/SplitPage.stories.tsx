import {Box, FlatList, ScrollView, SplitPage, Text} from "ferns-ui";
import React, {useState} from "react";

const WithRenderContent = () => {
  return (
    <SplitPage
      listViewData={Array.from(Array(100).keys()).map((i) => ({
        name: `user${i}`,
        id: i,
      }))}
      listViewWidth={250}
      renderContent={(index) => {
        return (
          <Box color="lightGray" padding={2}>
            {index === undefined && <Text weight="bold">Nothing selected</Text>}
            {index !== undefined && <Text weight="bold">User {index}</Text>}
          </Box>
        );
      }}
      renderListViewHeader={() => (
        <Box color="red" padding={2}>
          <Text weight="bold">Users:</Text>
        </Box>
      )}
      renderListViewItem={(item) => (
        <Box key={item.item.name} color="blue" padding={2}>
          <Text>name: {item.item.name}</Text>
        </Box>
      )}
    />
  );
};

const OneChild = () => {
  const [selected, setSelected] = useState("");

  return (
    <SplitPage
      listViewData={Array.from(Array(100).keys()).map((i) => ({
        name: `user${i}`,
        id: i,
      }))}
      renderListViewHeader={() => (
        <Box color="red" padding={2}>
          <Text weight="bold">Users:</Text>
        </Box>
      )}
      renderListViewItem={(item) => (
        <Box key={item.item.name} color="blue" padding={2}>
          <Text>name: {item.item.name}</Text>
        </Box>
      )}
      onSelectionChange={(val) => {
        setSelected(val.item.name);
      }}
    >
      <Box color="green" height="100%" padding={2}>
        <Text align="center">{selected}</Text>
      </Box>
    </SplitPage>
  );
};

const TwoChildren = () => {
  const [selected, setSelected] = useState("");

  return (
    <SplitPage
      listViewData={Array.from(Array(100).keys()).map((i) => ({
        name: `user${i}`,
        id: i,
      }))}
      renderListViewItem={(item) => (
        <Box key={item.item.name} color="blue" padding={2}>
          <Text>name: {item.item.name}</Text>
        </Box>
      )}
      onSelectionChange={(val) => {
        setSelected(val.item.name);
      }}
    >
      <Box color="green" height="100%" padding={2}>
        <Text align="center">First child with data: {selected}</Text>
      </Box>
      {ScrollableContent()}
    </SplitPage>
  );
};
const ManyChildren = () => {
  const [selected, setSelected] = useState("");

  return (
    <SplitPage
      listViewData={Array.from(Array(100).keys()).map((i) => ({
        name: `user${i}`,
        id: i,
      }))}
      renderListViewItem={(item) => (
        <Box key={item.item.name} color="blue" padding={2}>
          <Text>name: {item.item.name}</Text>
        </Box>
      )}
      selectLimit={2}
      tabs={["First child", "Second child", "Third"]}
      onSelectionChange={(val) => {
        setSelected(val.item.name);
      }}
    >
      <Box color="green" height="100%" padding={2}>
        <Text align="center">First child with data: {selected}</Text>
      </Box>
      <Box color="blue" height="100%" padding={2}>
        <Text align="center">Second child with data: {selected}</Text>
      </Box>
      {ScrollableContent()}
    </SplitPage>
  );
};

const ScrollableContent = () => {
  const items = Array.from(Array(100).keys()).map((i) => ({
    name: `user${i}`,
    id: i,
  }));

  return (
    <ScrollView>
      <FlatList
        contentContainerStyle={{height: "100%"}}
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={(item) => {
          return (
            <Box key={item.item.name} color="purple" padding={2}>
              <Text>name: {item.item.name}</Text>
            </Box>
          );
        }}
      />
    </ScrollView>
  );
};

export const SplitPageStories = {
  title: "Split Page",
  component: SplitPage,
  stories: {
    "Render Content Fn": function () {
      return <WithRenderContent />;
    },
    "One Child": function () {
      return <OneChild />;
    },
    "Two Children": function () {
      return <TwoChildren />;
    },
    "Many Children": function () {
      return <ManyChildren />;
    },
  },
};
