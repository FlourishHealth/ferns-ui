/**
 * The MIT License (MIT)
 *
 * Copyright © 2019 Arron Hunt <arronjhunt@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import emoji from "emoji-datasource";
import React, {useCallback, useEffect, useRef, useState} from "react";
import type {FlatListProps, LayoutChangeEvent} from "react-native";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const Categories = {
  all: {
    symbol: null,
    name: "All",
  },
  history: {
    symbol: "🕘",
    name: "Recently used",
  },
  emotion: {
    symbol: "😀",
    name: "Smileys & Emotion",
  },
  people: {
    symbol: "🧑",
    name: "People & Body",
  },
  nature: {
    symbol: "🦄",
    name: "Animals & Nature",
  },
  food: {
    symbol: "🍔",
    name: "Food & Drink",
  },
  activities: {
    symbol: "⚾️",
    name: "Activities",
  },
  places: {
    symbol: "✈️",
    name: "Travel & Places",
  },
  objects: {
    symbol: "💡",
    name: "Objects",
  },
  symbols: {
    symbol: "🔣",
    name: "Symbols",
  },
  flags: {
    symbol: "🏳️‍🌈",
    name: "Flags",
  },
};

interface Emoji {
  unified: string;
  short_names: string[];
  category: string;
  sort_order: number;
  obsoleted_by?: string;
  [key: string]: unknown;
}

type CategoryKey = keyof typeof Categories;
type Category = (typeof Categories)[CategoryKey];

const charFromUtf16 = (utf16: string): string =>
  String.fromCodePoint(...utf16.split("-").map((u) => Number(`0x${u}`)));

export const charFromEmojiObject = (obj: Emoji): string => charFromUtf16(obj.unified);

const filteredEmojis: Emoji[] = (emoji as Emoji[]).filter((e) => !e.obsoleted_by);

const emojiByCategory = (category: string): Emoji[] =>
  filteredEmojis.filter((e) => e.category === category);

const sortEmoji = (list: Emoji[]): Emoji[] => list.sort((a, b) => a.sort_order - b.sort_order);

const categoryKeys = Object.keys(Categories) as CategoryKey[];

interface TabBarProps {
  theme: string;
  activeCategory: Category;
  onPress: (category: Category) => void;
  width: number;
}

const TabBar = ({theme, activeCategory, onPress, width}: TabBarProps) => {
  const tabSize = width / categoryKeys.length;

  return categoryKeys.map((c) => {
    if (c === "all") {
      return null;
    }
    const category = Categories[c];
    return (
      <TouchableOpacity
        key={category.name}
        onPress={() => onPress(category)}
        style={{
          flex: 1,
          height: tabSize,
          borderColor: category === activeCategory ? theme : "#EEEEEE",
          borderBottomWidth: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 8,
            fontSize: Math.max(tabSize - 24, 18),
          }}
        >
          {category.symbol}
        </Text>
      </TouchableOpacity>
    );
  });
};

interface EmojiSelectorProps {
  theme: string;
  category: Category;
  showTabs: boolean;
  showSearchBar: boolean;
  showHistory: boolean;
  showSectionTitles: boolean;
  columns: number;
  placeholder: string;
  onEmojiSelected: (emoji: string) => void;
  shouldInclude?: (emoji: Emoji) => boolean;
  [key: string]: unknown;
}

interface EmojiListByCategory {
  [name: string]: Emoji[];
}

interface EmojiItem {
  key: string;
  emoji: Emoji;
}

interface EmojiCellProps {
  emoji: Emoji;
  colSize: number;
  onPress: () => void;
}

const EmojiCell = ({emoji, colSize, onPress}: EmojiCellProps) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={{
      width: colSize,
      height: colSize,
      alignItems: "center",
      justifyContent: "center",
    }}
    onPress={onPress}
  >
    <Text style={{color: "#FFFFFF", fontSize: Math.max(colSize - 12, 6)}}>
      {charFromEmojiObject(emoji)}
    </Text>
  </TouchableOpacity>
);

const storage_key = "@react-native-emoji-selector:HISTORY";

const EmojiSelector = (props: EmojiSelectorProps) => {
  const {
    theme,
    columns,
    placeholder,
    showHistory,
    showSearchBar,
    showSectionTitles,
    showTabs,
    category: initialCategory,
    shouldInclude,
    onEmojiSelected,
    ...other
  } = props;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<Category>(initialCategory);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [history, setHistory] = useState<Emoji[]>([]);
  const [emojiList, setEmojiList] = useState<EmojiListByCategory | null>(null);
  const [colSize, setColSize] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const scrollview = useRef<FlatList<EmojiItem> | null>(null);

  //
  //  HANDLER METHODS
  //
  const handleTabSelect = useCallback(
    (nextCategory: Category) => {
      if (isReady) {
        if (scrollview.current) {
          scrollview.current.scrollToOffset({offset: 0, animated: false});
        }
        setSearchQuery("");
        setCategory(nextCategory);
      }
    },
    [isReady]
  );

  const handleEmojiSelect = useCallback(
    (selectedEmoji: Emoji) => {
      if (showHistory) {
        addToHistoryAsync(selectedEmoji);
      }
      onEmojiSelected(charFromEmojiObject(selectedEmoji));
    },
    [onEmojiSelected, showHistory]
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const addToHistoryAsync = useCallback(async (selectedEmoji: Emoji) => {
    const stored = await AsyncStorage.getItem(storage_key);

    let value: Emoji[] = [];
    if (!stored) {
      // no history
      const record = Object.assign({}, selectedEmoji, {count: 1});
      value.push(record);
    } else {
      const json: Emoji[] = JSON.parse(stored);
      if (json.filter((r) => r.unified === selectedEmoji.unified).length > 0) {
        value = json;
      } else {
        const record = Object.assign({}, selectedEmoji, {count: 1});
        value = [record, ...json];
      }
    }

    AsyncStorage.setItem(storage_key, JSON.stringify(value));
    setHistory(value);
  }, []);

  const loadHistoryAsync = useCallback(async () => {
    const result = await AsyncStorage.getItem(storage_key);
    if (result) {
      const parsed: Emoji[] = JSON.parse(result);
      setHistory(parsed);
    }
  }, []);

  //
  //  RENDER METHODS
  //
  const renderEmojiCell: FlatListProps<EmojiItem>["renderItem"] = useCallback(
    ({item}: {item: EmojiItem}) => (
      <EmojiCell
        key={item.key}
        emoji={item.emoji}
        onPress={() => handleEmojiSelect(item.emoji)}
        colSize={colSize}
      />
    ),
    [handleEmojiSelect, colSize]
  );

  const returnSectionData = useCallback((): EmojiItem[] => {
    const currentEmojiList = emojiList;
    if (!currentEmojiList) {
      return [];
    }

    const currentCategory = category;
    const currentSearchQuery = searchQuery;
    const currentHistory = history;
    let emojiData: EmojiItem[];

    if (currentCategory === Categories.all && currentSearchQuery === "") {
      //TODO: OPTIMIZE THIS
      const largeList: Emoji[] = [];
      for (const c of categoryKeys) {
        const name = Categories[c].name;
        const list =
          name === Categories.history.name ? currentHistory : currentEmojiList[name] || [];
        if (c !== "all" && c !== "history") {
          largeList.push(...list);
        }
      }

      emojiData = largeList.map((e) => ({key: e.unified, emoji: e}));
    } else {
      let list: Emoji[];
      const hasSearchQuery = currentSearchQuery !== "";
      const name = currentCategory.name;
      if (hasSearchQuery) {
        const filtered = filteredEmojis.filter((e) => {
          let display = false;
          for (const shortName of e.short_names) {
            if (shortName.includes(currentSearchQuery.toLowerCase())) {
              display = true;
              break;
            }
          }
          return display;
        });
        list = sortEmoji(filtered);
      } else if (name === Categories.history.name) {
        list = currentHistory;
      } else {
        list = currentEmojiList[name] || [];
      }
      emojiData = list.map((e) => ({key: e.unified, emoji: e}));
    }

    return shouldInclude ? emojiData.filter((e) => shouldInclude(e.emoji)) : emojiData;
  }, [category, emojiList, history, searchQuery, shouldInclude]);

  const prerenderEmojis = useCallback(
    (callback?: () => void) => {
      const listByCategory: EmojiListByCategory = {};
      for (const c of categoryKeys) {
        const name = Categories[c].name;
        listByCategory[name] = sortEmoji(emojiByCategory(name));
      }

      setEmojiList(listByCategory);
      setColSize(Math.max(Math.floor(width / columns), 32));
      if (callback) {
        callback();
      }
    },
    [columns, width]
  );

  const handleLayout = useCallback(
    ({nativeEvent: {layout}}: LayoutChangeEvent) => {
      setWidth(layout.width);
      prerenderEmojis(() => {
        setIsReady(true);
      });
    },
    [prerenderEmojis]
  );

  //
  //  LIFECYCLE METHODS
  //
  useEffect(() => {
    setCategory(initialCategory);
    if (showHistory) {
      loadHistoryAsync();
    }
  }, [initialCategory, loadHistoryAsync, showHistory]);

  const Searchbar = (
    <View style={styles.searchbar_container}>
      <TextInput
        style={styles.search}
        placeholder={placeholder}
        clearButtonMode="always"
        returnKeyType="done"
        autoCorrect={false}
        underlineColorAndroid={theme}
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>
  );

  const title = searchQuery !== "" ? "Search Results" : category.name;

  return (
    <View style={styles.frame} {...other} onLayout={handleLayout}>
      <View style={styles.tabBar}>
        {showTabs && (
          <TabBar activeCategory={category} onPress={handleTabSelect} theme={theme} width={width} />
        )}
      </View>
      <View style={{flex: 1}}>
        {showSearchBar && Searchbar}
        {isReady ? (
          <View style={{flex: 1}}>
            <View style={styles.container}>
              {showSectionTitles && <Text style={styles.sectionHeader}>{title}</Text>}
              <FlatList
                style={styles.scrollview}
                contentContainerStyle={{paddingBottom: colSize}}
                data={returnSectionData()}
                renderItem={renderEmojiCell}
                horizontal={false}
                numColumns={columns}
                keyboardShouldPersistTaps={"always"}
                ref={scrollview}
                removeClippedSubviews
              />
            </View>
          </View>
        ) : (
          <View style={styles.loader} {...other}>
            <ActivityIndicator
              size={"large"}
              color={Platform.OS === "android" ? theme : "#000000"}
            />
          </View>
        )}
      </View>
    </View>
  );
};

EmojiSelector.defaultProps = {
  theme: "#007AFF",
  category: Categories.all,
  showTabs: true,
  showSearchBar: true,
  showHistory: false,
  showSectionTitles: true,
  columns: 6,
  placeholder: "Search...",
};

export default EmojiSelector;

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    width: "100%",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    flexDirection: "row",
  },
  scrollview: {
    flex: 1,
    overflow: "hidden",
  },
  searchbar_container: {
    width: "100%",
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  search: {
    ...Platform.select({
      ios: {
        height: 36,
        paddingLeft: 8,
        borderRadius: 10,
        backgroundColor: "#E5E8E9",
      },
    }),
    margin: 8,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  sectionHeader: {
    margin: 8,
    fontSize: 17,
    width: "100%",
    color: "#8F8F8F",
  },
});
