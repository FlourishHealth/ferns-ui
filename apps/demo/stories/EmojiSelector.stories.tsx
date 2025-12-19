import {Box, EmojiSelector, Text} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const EmojiSelectorDemo = (): ReactElement => {
  const [selected, setSelected] = useState("");

  return (
    <Box maxWidth={500} padding={2} gap={2}>
      <Box
        padding={3}
        rounding="md"
        color="lightGray"
        display="flex"
        alignItems="center"
        justifyContent="center"
        direction="row"
        gap={2}
      >
        <Text weight="bold">Selected emoji:</Text>
        {selected ? <Text size="2xl">{selected}</Text> : <Text color="gray">None</Text>}
      </Box>
      <Box height={350} overflow="hidden" rounding="md">
        <EmojiSelector
          category={EmojiSelector.defaultProps.category}
          columns={EmojiSelector.defaultProps.columns}
          onEmojiSelected={setSelected}
          placeholder={EmojiSelector.defaultProps.placeholder}
          showHistory={false}
          showSearchBar
          showSectionTitles
          showTabs
          theme={EmojiSelector.defaultProps.theme}
        />
      </Box>
    </Box>
  );
};
