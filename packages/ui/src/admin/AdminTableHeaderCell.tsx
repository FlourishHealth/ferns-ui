// eslint-enable  react-perf/jsx-no-new-object-as-prop, react-perf/jsx-no-new-array-as-prop, react-perf/jsx-no-new-function-as-prop, react-perf/jsx-no-jsx-as-prop

/*
A Header for the tables in OpenAPIAdmin. It allows for sorting and filtering of the table,
unlike the normal TableHeaderCell which only allows sorting. It uses the OpenAPIContext to
get the possible options for filtering and sorting.
*/
import React, {ReactElement, useCallback, useState} from "react";

import {Box} from "../Box";
import {AdminTableHeaderCellProps} from "../Common";
import {Field} from "../Field";
import {Heading} from "../Heading";
import {Icon} from "../Icon";
import {Modal} from "../Modal";
import {useOpenAPISpec} from "../OpenAPIContext";
import {SegmentedControl} from "../SegmentedControl";
import {useTableContext} from "../tables";

/**
 * The AdminTableHeaderCell uses OpenAPI to provide a way to filter and sort the table, unlike
 * the normal TableHeaderCell which only allows sorting.
 */
export const AdminTableHeaderCell = ({
  children,
  index,
  sortable,
  sort,
  onSortChange,
  field,
  model,
  onFiltersChange,
  filters,
  onSearchChange,
  search,
}: AdminTableHeaderCellProps): ReactElement => {
  const {columns} = useTableContext();
  const spec = useOpenAPISpec();
  const modelField = spec.getModelField(model, field);
  const fieldEnum = modelField?.enum ?? [];
  const width = columns[index];
  if (!width) {
    console.warn(`No width defined for column ${index} in TableHeaderCell`);
  }

  const [showSortFilterModal, setShowSortFilterModal] = useState(false);
  const onClick = useCallback(() => {
    if (sortable) {
      setShowSortFilterModal(true);
    }
  }, [sortable]);

  const onSort = useCallback(
    ({activeIndex}: {activeIndex: number | number[]}) => {
      if (activeIndex === 0) {
        onSortChange?.("asc");
      } else if (activeIndex === 1) {
        onSortChange?.("desc");
      } else if (activeIndex === 2) {
        onSortChange?.(undefined);
      }
    },
    [onSortChange]
  );

  const primaryButtonOnClick = useCallback(() => {
    // TODO do the search here
    setShowSortFilterModal(false);
  }, []);

  const onSelectBoolean = useCallback(
    ({activeIndex}: {activeIndex: number}) => {
      if (activeIndex === 2) {
        onFiltersChange([]);
        return;
      } else {
        onFiltersChange(activeIndex === 0 ? ["true"] : ["false"]);
      }
    },
    [onFiltersChange]
  );

  const onDismiss = useCallback(() => {
    setShowSortFilterModal(false);
  }, []);

  if (sortable) {
    if (!onSortChange) {
      console.error("onSortChange is required when sortable is true");
    }

    return (
      <>
        <Modal
          heading={`Sort/Filter by ${field}`}
          primaryButtonOnClick={primaryButtonOnClick}
          primaryButtonText="Save"
          showClose
          visible={showSortFilterModal}
          onDismiss={onDismiss}
        >
          <Box>
            {Boolean(onSortChange) && (
              <Box paddingY={2}>
                <SegmentedControl
                  items={["Ascending", "Descending", "None"]}
                  selectedItemIndex={
                    sort?.direction === "asc" ? 0 : sort?.direction === "desc" ? 1 : 2
                  }
                  onChange={onSort}
                />
              </Box>
            )}
            {Boolean(fieldEnum?.length || modelField?.type === "boolean") && (
              <Box paddingY={2}>
                <Box marginBottom={1}>
                  <Heading size="sm">Filter by:</Heading>
                </Box>
                {Boolean(fieldEnum?.length) && (
                  <Field
                    options={fieldEnum.map((o) => ({label: o, value: o}))}
                    type="multiselect"
                    value={filters}
                    onChange={(res: any) => {
                      onFiltersChange(res);
                    }}
                  />
                )}
                {Boolean(modelField?.type === "boolean") && (
                  <SegmentedControl
                    items={["True", "False", "None"]}
                    selectedItemIndex={
                      filters?.[0] === "true" ? 0 : filters?.[0] === "false" ? 1 : 2
                    }
                    onChange={onSelectBoolean}
                  />
                )}
              </Box>
            )}
            {Boolean(modelField?.type === "string") && (
              <Box paddingY={2}>
                <Field label="Search" type="text" value={search} onChange={onSearchChange} />
              </Box>
            )}
          </Box>
        </Modal>
        <Box
          alignItems="center"
          direction="row"
          flex="grow"
          justifyContent="between"
          marginBottom={2}
          marginTop={2}
          maxWidth={width}
          minHeight={36}
          width={width}
          onClick={onClick}
        >
          {Boolean(filters?.length > 0) && (
            <Box paddingX={2}>
              <Icon color="darkGray" name="filter" size="sm" />
            </Box>
          )}
          {Boolean(sort) && (
            <Box paddingX={2}>
              <Icon
                color="darkGray"
                name={sort?.direction === "asc" ? "arrow-down" : "arrow-up"}
                size="sm"
              />
            </Box>
          )}
          {children}
        </Box>
      </>
    );
  } else {
    return (
      <Box flex="grow" justifyContent="center" marginBottom={2} marginTop={2} width={width}>
        {children}
      </Box>
    );
  }
};
