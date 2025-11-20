import React from "react";

import EmojiSelector, { Categories } from "./EmojiSelector";
import { renderWithTheme } from "./test-utils";

describe("EmojiSelector", () => {
	it("renders search bar when showSearchBar is true", () => {
		const { getByPlaceholderText } = renderWithTheme(
			<EmojiSelector
				category={Categories.all}
				columns={6}
				onEmojiSelected={jest.fn()}
				placeholder="Search emojis"
				showHistory={false}
				showSearchBar
				showSectionTitles
				showTabs
				theme="#007AFF"
			/>,
		);

		expect(getByPlaceholderText("Search emojis")).toBeTruthy();
	});

	it("renders tab bar when showTabs is true", () => {
		const { getByText } = renderWithTheme(
			<EmojiSelector
				category={Categories.people}
				columns={6}
				onEmojiSelected={jest.fn()}
				placeholder="Search emojis"
				showHistory={false}
				showSearchBar
				showSectionTitles
				showTabs
				theme="#007AFF"
			/>,
		);

		// One of the known category symbols
		expect(getByText("😀")).toBeTruthy();
	});

	it("matches snapshot", () => {
		const tree = renderWithTheme(
			<EmojiSelector
				category={Categories.people}
				columns={6}
				onEmojiSelected={jest.fn()}
				placeholder="Search emojis"
				showHistory={false}
				showSearchBar
				showSectionTitles
				showTabs
				theme="#007AFF"
			/>,
		);

		expect(tree.toJSON()).toMatchSnapshot();
	});
});
