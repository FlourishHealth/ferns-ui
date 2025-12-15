import {Box, EmojiSelector, Text} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const EmojiSelectorDemo = (): ReactElement => {
  const [selected, setSelected] = useState("");

  return (
    <Box maxWidth={500} padding={2} gap={2}>
      <Text>Selected emoji: {selected || "None"}</Text>
      <Box height={350} overflow="hidden" borderRadius={8}>
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
