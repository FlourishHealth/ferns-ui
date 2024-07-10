import React, {ReactElement} from "react";
import {Pressable, View} from "react-native";

import {IconName, PaginationProps} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {useTheme} from "./Theme";

const PaginationButton = ({
  type,
  onClick,
  totalPages = 1,
  page = 1,
}: {
  type: "first" | "prev" | "next" | "last" | "more";
  onClick: () => void;
  totalPages?: number;
  page?: number;
}): React.ReactElement | null => {
  let icon: IconName;
  let disabled = false;

  if (type === "first") {
    icon = "angles-left";
    disabled = page <= 1;
  } else if (type === "prev") {
    icon = "angle-left";
    disabled = page <= 1;
  } else if (type === "next") {
    icon = "angle-right";
    disabled = page >= totalPages;
  } else if (type === "last") {
    icon = "angles-right";
    disabled = page >= totalPages;
  } else if (type === "more") {
    icon = "ellipsis";
  } else {
    throw new Error(`Invalid Pagination Button type ${type}`);
  }
  // TODO: Show text input when tapping more.

  return (
    <Pressable
      accessibilityHint={`Click to go to ${type} page`}
      accessibilityLabel="Pagination Button"
      disabled={disabled}
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onClick}
    >
      <Icon color={disabled ? "extraLight" : "primary"} iconName={icon} size="md" />
    </Pressable>
  );
};

const PaginationNumber = ({
  number,
  current,
  onClick,
}: {
  number: number | "more";
  current: boolean;
  onClick: () => void;
}): ReactElement => {
  // Shortcut to make rendering the number buttons easier.
  if (number === "more") {
    return <PaginationButton type="more" onClick={() => {}} />;
  }
  return (
    <Pressable
      accessibilityHint={`Click to go to page ${number}`}
      accessibilityLabel="Pagination Number"
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
      }}
      onPress={onClick}
    >
      <Text color={current ? "accent" : "primary"}>{number}</Text>
    </Pressable>
  );
};

export const Pagination = ({totalPages, page, setPage}: PaginationProps): ReactElement | null => {
  const {theme} = useTheme();

  // Determine the number of pages to show. Show the first page,
  // the page before and after the current page, and the last page.
  const pages: (number | "more")[] = [];
  if (page > 2) {
    pages.push(1);
  }

  if (page > 3) {
    pages.push("more");
  }

  if (page > 1) {
    pages.push(page - 1);
  }

  pages.push(page);

  if (page < totalPages) {
    pages.push(page + 1);
  }

  if (page < totalPages - 2) {
    pages.push("more");
  }

  if (page < totalPages - 1) {
    pages.push(totalPages);
  }

  // TODO: Add hover for pagination numbers.

  if (!pages) {
    return null;
  }
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: theme.spacing.xs as any,
        alignItems: "center",
      }}
    >
      <PaginationButton
        page={page}
        totalPages={totalPages}
        type="first"
        onClick={() => setPage(1)}
      />
      <PaginationButton
        page={page}
        totalPages={totalPages}
        type="prev"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      />
      {pages.map((number, index) => (
        <PaginationNumber
          key={number === "more" ? `more${index}` : number}
          current={number === page}
          number={number}
          onClick={() => setPage(number as number)}
        />
      ))}

      <PaginationButton
        page={page}
        totalPages={totalPages}
        type="next"
        onClick={() => {
          setPage(page + 1);
        }}
      />
      <PaginationButton
        page={page}
        totalPages={totalPages}
        type="last"
        onClick={() => setPage(10)}
      />
    </View>
  );
};
