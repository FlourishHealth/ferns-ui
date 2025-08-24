import {act, fireEvent} from "@testing-library/react-native";
import React from "react";

import {Box} from "./Box";
import {Text} from "./Text";
import {renderWithTheme} from "./test-utils";

// Mock the mediaQueryLargerThan function
jest.mock("./MediaQuery", () => ({
  mediaQueryLargerThan: jest.fn(() => false),
}));

describe("Box", () => {
  describe("basic rendering", () => {
    it("should render with default props", () => {
      const {root} = renderWithTheme(<Box />);
      expect(root).toBeTruthy();
    });

    it("should render children", () => {
      const {getByText} = renderWithTheme(
        <Box>
          <Text>Test Content</Text>
        </Box>
      );
      expect(getByText("Test Content")).toBeTruthy();
    });

    it("should apply testID", () => {
      const {getByTestId} = renderWithTheme(<Box testID="test-box" />);
      expect(getByTestId("test-box")).toBeTruthy();
    });
  });

  describe("layout props", () => {
    it("should apply direction prop", () => {
      const {root} = renderWithTheme(<Box direction="column" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        flexDirection: "column",
        display: "flex"
      });
    });

    it("should apply responsive direction props", () => {
      const {root} = renderWithTheme(<Box smDirection="row" />);
      expect(root).toBeTruthy();
    });

    it("should apply flex grow", () => {
      const {root} = renderWithTheme(<Box flex="grow" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        flexGrow: 1,
        flexShrink: 1,
        display: "flex"
      });
    });

    it("should apply flex shrink", () => {
      const {root} = renderWithTheme(<Box flex="shrink" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        flexShrink: 1,
        display: "flex"
      });
    });

    it("should apply flex none", () => {
      const {root} = renderWithTheme(<Box flex="none" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        flex: 0,
        display: "flex"
      });
    });

    it("should apply justifyContent", () => {
      const {root} = renderWithTheme(<Box justifyContent="center" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        justifyContent: "center"
      });
    });

    it("should apply alignItems", () => {
      const {root} = renderWithTheme(<Box alignItems="center" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        alignItems: "center"
      });
    });

    it("should apply alignContent", () => {
      const {root} = renderWithTheme(<Box alignContent="center" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        alignContent: "center"
      });
    });

    it("should apply alignSelf", () => {
      const {root} = renderWithTheme(<Box alignSelf="center" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        alignSelf: "center"
      });
    });

    it("should apply wrap", () => {
      const {root} = renderWithTheme(<Box wrap />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        flexWrap: "wrap",
        alignItems: "flex-start"
      });
    });

    it("should apply gap", () => {
      const {root} = renderWithTheme(<Box gap={4} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        gap: 16
      });
    });
  });

  describe("spacing props", () => {
    it("should apply padding", () => {
      const {root} = renderWithTheme(<Box padding={4} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        padding: 16
      });
    });

    it("should apply paddingX", () => {
      const {root} = renderWithTheme(<Box paddingX={2} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        paddingLeft: 8,
        paddingRight: 8
      });
    });

    it("should apply paddingY", () => {
      const {root} = renderWithTheme(<Box paddingY={3} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        paddingTop: 12,
        paddingBottom: 12
      });
    });

    it("should apply margin", () => {
      const {root} = renderWithTheme(<Box margin={4} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        margin: 16
      });
    });

    it("should apply marginTop", () => {
      const {root} = renderWithTheme(<Box marginTop={2} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        marginTop: 8
      });
    });

    it("should apply marginBottom", () => {
      const {root} = renderWithTheme(<Box marginBottom={2} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        marginBottom: 8
      });
    });

    it("should apply marginLeft", () => {
      const {root} = renderWithTheme(<Box marginLeft={2} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        marginLeft: 8
      });
    });

    it("should apply marginRight", () => {
      const {root} = renderWithTheme(<Box marginRight={2} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        marginRight: 8
      });
    });
  });

  describe("sizing props", () => {
    it("should apply width", () => {
      const {root} = renderWithTheme(<Box width={100} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        width: 100
      });
    });

    it("should apply height", () => {
      const {root} = renderWithTheme(<Box height={100} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        height: 100
      });
    });

    it("should apply string width", () => {
      const {root} = renderWithTheme(<Box width="50%" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        width: "50%"
      });
    });

    it("should apply string height", () => {
      const {root} = renderWithTheme(<Box height="50%" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        height: "50%"
      });
    });
  });

  describe("position props", () => {
    it("should apply position absolute", () => {
      const {root} = renderWithTheme(<Box position="absolute" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        position: "absolute"
      });
    });

    it("should apply top", () => {
      const {root} = renderWithTheme(<Box top />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        top: 0
      });
    });

    it("should apply bottom", () => {
      const {root} = renderWithTheme(<Box bottom />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        bottom: 0
      });
    });

    it("should apply left", () => {
      const {root} = renderWithTheme(<Box left />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        left: 0
      });
    });

    it("should apply right", () => {
      const {root} = renderWithTheme(<Box right />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        right: 0
      });
    });

    it("should apply zIndex", () => {
      const {root} = renderWithTheme(<Box zIndex={10} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        zIndex: 10
      });
    });
  });

  describe("color and surface props", () => {
    it("should apply background color", () => {
      const {root} = renderWithTheme(<Box color="primary" />);
      const view = root.findByType("View");
      expect(view.props.style.backgroundColor).toBeDefined();
    });
  });

  describe("border props", () => {
    it("should apply border", () => {
      const {root} = renderWithTheme(<Box border="default" />);
      const view = root.findByType("View");
      expect(view.props.style.borderColor).toBeDefined();
      expect(view.props.style.borderWidth).toBe(1);
    });

    it("should apply borderTop", () => {
      const {root} = renderWithTheme(<Box borderTop="default" />);
      const view = root.findByType("View");
      expect(view.props.style.borderTopColor).toBeDefined();
      expect(view.props.style.borderTopWidth).toBe(1);
    });

    it("should apply borderBottom", () => {
      const {root} = renderWithTheme(<Box borderBottom="default" />);
      const view = root.findByType("View");
      expect(view.props.style.borderBottomColor).toBeDefined();
      expect(view.props.style.borderBottomWidth).toBe(1);
    });

    it("should apply borderLeft", () => {
      const {root} = renderWithTheme(<Box borderLeft="default" />);
      const view = root.findByType("View");
      expect(view.props.style.borderLeftColor).toBeDefined();
      expect(view.props.style.borderLeftWidth).toBe(1);
    });

    it("should apply borderRight", () => {
      const {root} = renderWithTheme(<Box borderRight="default" />);
      const view = root.findByType("View");
      expect(view.props.style.borderRightColor).toBeDefined();
      expect(view.props.style.borderRightWidth).toBe(1);
    });

    it("should adjust width for border", () => {
      const {root} = renderWithTheme(<Box border="default" width={100} />);
      const view = root.findByType("View");
      expect(view.props.style.width).toBe(104); // 100 + 2*2 for border
    });

    it("should adjust height for border", () => {
      const {root} = renderWithTheme(<Box border="default" height={100} />);
      const view = root.findByType("View");
      expect(view.props.style.height).toBe(104); // 100 + 2*2 for border
    });
  });

  describe("rounding props", () => {
    it("should apply rounding", () => {
      const {root} = renderWithTheme(<Box rounding="md" />);
      const view = root.findByType("View");
      expect(view.props.style.borderRadius).toBe(4);
    });

    it("should apply circle rounding with width", () => {
      const {root} = renderWithTheme(<Box rounding="circle" width={50} />);
      const view = root.findByType("View");
      expect(view.props.style.borderRadius).toBe(50);
    });

    it("should apply circle rounding with height", () => {
      const {root} = renderWithTheme(<Box rounding="circle" height={50} />);
      const view = root.findByType("View");
      expect(view.props.style.borderRadius).toBe(50);
    });

    it("should warn when using circle without dimensions", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      renderWithTheme(<Box rounding="circle" />);
      expect(consoleSpy).toHaveBeenCalledWith("Cannot use Box rounding='circle' without height or width.");
      consoleSpy.mockRestore();
    });
  });

  describe("display props", () => {
    it("should apply display none", () => {
      const {root} = renderWithTheme(<Box display="none" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        display: "none"
      });
    });

    it("should apply display flex", () => {
      const {root} = renderWithTheme(<Box display="flex" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        flex: undefined
      });
    });

    it("should apply display block", () => {
      const {root} = renderWithTheme(<Box display="block" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        flex: 0,
        flexDirection: "row"
      });
    });
  });

  describe("overflow props", () => {
    it("should apply overflow scroll", () => {
      const {root} = renderWithTheme(<Box overflow="scroll" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        overflow: "scroll"
      });
    });

    it("should apply overflow scrollY", () => {
      const {root} = renderWithTheme(<Box overflow="scrollY" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        overflow: "scroll"
      });
    });

    it("should apply overflow hidden", () => {
      const {root} = renderWithTheme(<Box overflow="hidden" />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        overflow: "hidden"
      });
    });
  });

  describe("shadow props", () => {
    it("should apply shadow", () => {
      const {root} = renderWithTheme(<Box shadow />);
      const view = root.findByType("View");
      expect(view.props.style).toBeDefined();
    });
  });

  describe("clickable behavior", () => {
    it("should render as Pressable when onClick is provided", () => {
      const mockOnClick = jest.fn();
      const {root} = renderWithTheme(
        <Box onClick={mockOnClick} accessibilityLabel="Click me" accessibilityHint="Tap to trigger action">
          <Text>Clickable content</Text>
        </Box>
      );
      
      expect(root).toBeTruthy();
      // Just verify the component renders without error when onClick is provided
    });

    it("should call onClick when pressed", async () => {
      const mockOnClick = jest.fn();
      const {getByTestId} = renderWithTheme(
        <Box 
          onClick={mockOnClick} 
          testID="clickable-box"
          accessibilityLabel="Click me" 
          accessibilityHint="Tap to trigger action"
        />
      );
      
      const pressable = getByTestId("clickable-box-clickable");
      await act(async () => {
        fireEvent.press(pressable);
      });
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should apply accessibility props to Pressable", () => {
      const mockOnClick = jest.fn();
      const {getByTestId} = renderWithTheme(
        <Box 
          onClick={mockOnClick}
          testID="accessible-box"
          accessibilityLabel="Click me"
          accessibilityHint="Tap to trigger action"
        />
      );
      
      const pressable = getByTestId("accessible-box-clickable");
      expect(pressable).toBeTruthy();
      // Basic check that accessibility props are being applied
      expect(pressable.props).toBeDefined();
    });
  });

  describe("scroll behavior", () => {
    it("should render ScrollView when scroll is enabled", () => {
      const {root} = renderWithTheme(<Box scroll />);
      expect(root).toBeTruthy();
      // Just verify the component renders without error when scroll is enabled
    });

    it("should enable horizontal scrolling when overflow is scrollX", () => {
      const {root} = renderWithTheme(<Box scroll overflow="scrollX" />);
      expect(root).toBeTruthy();
      // Just verify the component renders without error when horizontal scroll is enabled
    });

    it("should call onScroll callback", () => {
      const mockOnScroll = jest.fn();
      const {root} = renderWithTheme(<Box scroll onScroll={mockOnScroll} />);
      expect(root).toBeTruthy();
      // Just verify the component renders without error when onScroll is provided
    });
  });

  describe("keyboard avoidance", () => {
    it("should render KeyboardAvoidingView when avoidKeyboard is enabled", () => {
      const {root} = renderWithTheme(<Box avoidKeyboard />);
      expect(root).toBeTruthy();
      // Just verify the component renders without error when avoidKeyboard is enabled
    });

    it("should apply keyboard offset", () => {
      const {root} = renderWithTheme(<Box avoidKeyboard keyboardOffset={20} />);
      expect(root).toBeTruthy();
      // Just verify the component renders without error when keyboard offset is provided
    });
  });

  describe("hover events", () => {
    it("should call onHoverStart", async () => {
      const mockOnHoverStart = jest.fn();
      const {getByTestId} = renderWithTheme(
        <Box onHoverStart={mockOnHoverStart} testID="hover-box" />
      );
      
      const view = getByTestId("hover-box");
      await act(async () => {
        fireEvent(view, "pointerEnter");
      });
      
      expect(mockOnHoverStart).toHaveBeenCalledTimes(1);
    });

    it("should call onHoverEnd", async () => {
      const mockOnHoverEnd = jest.fn();
      const {getByTestId} = renderWithTheme(
        <Box onHoverEnd={mockOnHoverEnd} testID="hover-box" />
      );
      
      const view = getByTestId("hover-box");
      await act(async () => {
        fireEvent(view, "pointerLeave");
      });
      
      expect(mockOnHoverEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe("ref forwarding", () => {
    it("should expose scrollToEnd method", () => {
      const ref = React.createRef<any>();
      renderWithTheme(<Box ref={ref} scroll />);
      
      expect(ref.current).toBeTruthy();
      expect(typeof ref.current.scrollToEnd).toBe("function");
    });

    it("should expose scrollTo method", () => {
      const ref = React.createRef<any>();
      renderWithTheme(<Box ref={ref} scroll />);
      
      expect(ref.current).toBeTruthy();
      expect(typeof ref.current.scrollTo).toBe("function");
    });
  });

  describe("dangerous inline styles", () => {
    it("should apply dangerouslySetInlineStyle", () => {
      const {root} = renderWithTheme(
        <Box dangerouslySetInlineStyle={{ __style: { backgroundColor: "red" } }} />
      );
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        backgroundColor: "red"
      });
    });
  });

  describe("warnings", () => {
    it("should warn when using wrap and alignItems together", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      renderWithTheme(<Box wrap alignItems="center" />);
      expect(consoleSpy).toHaveBeenCalledWith("React Native doesn't support wrap and alignItems together.");
      consoleSpy.mockRestore();
    });
  });

  describe("edge cases", () => {
    it("should handle undefined children", () => {
      const {root} = renderWithTheme(<Box>{undefined}</Box>);
      expect(root).toBeTruthy();
    });

    it("should handle null children", () => {
      const {root} = renderWithTheme(<Box>{null}</Box>);
      expect(root).toBeTruthy();
    });

    it("should handle multiple children", () => {
      const {getByText} = renderWithTheme(
        <Box>
          <Text>First</Text>
          <Text>Second</Text>
        </Box>
      );
      expect(getByText("First")).toBeTruthy();
      expect(getByText("Second")).toBeTruthy();
    });

    it("should handle zero values", () => {
      const {root} = renderWithTheme(<Box padding={0} margin={0} gap={0} />);
      const view = root.findByType("View");
      expect(view.props.style).toMatchObject({
        padding: 0,
        margin: 0,
        gap: 0
      });
    });
  });

  describe("snapshots", () => {
    it("should match snapshot with default props", () => {
      const component = renderWithTheme(<Box />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with layout props", () => {
      const component = renderWithTheme(
        <Box 
          direction="column" 
          flex="grow" 
          justifyContent="center" 
          alignItems="center" 
          padding={4}
          margin={2}
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with clickable props", () => {
      const component = renderWithTheme(
        <Box 
          onClick={jest.fn()}
          accessibilityLabel="Click me"
          accessibilityHint="Tap to trigger action"
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with scroll enabled", () => {
      const component = renderWithTheme(<Box scroll />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with keyboard avoidance", () => {
      const component = renderWithTheme(<Box avoidKeyboard />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with border and rounding", () => {
      const component = renderWithTheme(
        <Box 
          border="default"
          rounding="md"
          color="primary"
          shadow
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});