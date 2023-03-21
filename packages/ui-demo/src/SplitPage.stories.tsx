import {Box, SplitPage, Text} from "ferns-ui";
import React, {useState} from "react";

const WithRenderContent = () => {
  return (
    <SplitPage
      listViewData={Array.from(Array(100).keys()).map((i) => ({
        name: `user${i}`,
        id: i,
      }))}
      listViewWidth={250}
      navigation={{}}
      renderContent={(index) => (
        <Box color="lightGray" padding={2}>
          {index === undefined && <Text weight="bold">Nothing selected</Text>}
          {index !== undefined && <Text weight="bold">User {index}</Text>}
        </Box>
      )}
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
      renderListViewItem={(item) => (
        <Box
          key={item.item.name}
          color="blue"
          padding={2}
          onClick={() => {
            setSelected(item.item.name);
          }}
        >
          <Text>name: {item.item.name}</Text>
        </Box>
      )}
    >
      <Box>
        <Text>{selected}</Text>
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
        <Box
          key={item.item.name}
          color="blue"
          padding={2}
          onClick={() => {
            setSelected(item.item.name);
          }}
        >
          <Text>name: {item.item.name}</Text>
        </Box>
      )}
    >
      <Box>
        <Text>First child with data: {selected}</Text>
      </Box>
      <Box>
        <Text>Second child with data: {selected}</Text>
      </Box>
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
        <Box
          key={item.item.name}
          color="blue"
          padding={2}
          onClick={() => {
            setSelected(item.item.name);
          }}
        >
          <Text>name: {item.item.name}</Text>
        </Box>
      )}
      tabs={["First child", "Second child", "Third"]}
    >
      <Box color="green">
        <Text>First child with data: {selected}</Text>
      </Box>
      <Box color="blue">
        <Text>Second child with data: {selected}</Text>
      </Box>
      <Box color="purple">
        <Text>Third child with data: {selected}</Text>
      </Box>
    </SplitPage>
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
