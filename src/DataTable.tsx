import { Accessor, createEffect, createMemo, createSignal, For, Show } from "solid-js";
import css from "./DataTable.scss";
import { DataTableCell } from "./DataTableCell";
import { Divider } from "./Divider";
import { Gravity } from "./Gravity";
import { IconButton } from "./IconButton";
import arrowDownIcon from "./image/arrow-down.svg";
import { i18n } from "./utility/i18n";
import { objectFromEntries } from "./utility/others";
import { joinClasses, joinStyle, prepareProps, SkelProps, SkelSlot } from "./utility/props";
import { registerCss } from "./utility/registerCss";
import { Slot } from "./utility/Slot";

registerCss(css);

type ColumnAlign = "left" | "center" | "right";
type CompareFunction<Row extends Record<string, unknown>> = (
  value1: any,
  value2: any,
  row1: Row,
  row2: Row,
) => number;

export type DataTableProps<
  Column extends {
    id: ColumnId;
    title?: string;
    sortable?: boolean | CompareFunction<Row>;
    align?: ColumnAlign;
    // TODO: Make type of 'value' property precise.
    cell?: SkelSlot<{
      value: unknown extends Row[ColumnId] ? any : Row[ColumnId];
      row: Row;
      columnId: ColumnId;
    }>;
  },
  ColumnId extends string,
  Row extends Record<string, unknown>,
> = SkelProps<{
  columns: readonly Column[];
  rows: readonly Row[];
  fullWidth?: boolean;
  evenRowBackgroundColor?: string;
  oddRowBackgroundColor?: string;
  onClickRow?: (row: Row) => void;
  sortingState?: { columnId: string; reversed: boolean } | undefined;
  horizontalRuledLine?: SkelSlot<{ verticalIndex: number }>;
  verticalRuledLine?: SkelSlot<{ verticalIndex: number; horizontalIndex: number }>;
  headerCell?: SkelSlot<{ columnId: string; columnTitle: string }>;
  emptyState?: SkelSlot<{}>;
}>;

export function DataTable<
  Column extends {
    id: ColumnId;
    title?: string;
    sortable?: boolean | CompareFunction<Row>;
    align?: ColumnAlign;
    cell?: SkelSlot<{
      value: unknown extends Row[ColumnId] ? any : Row[ColumnId];
      row: Row;
      columnId: ColumnId;
    }>;
  },
  ColumnId extends string,
  Row extends Record<string, unknown>,
>(rawProps: DataTableProps<Column, ColumnId, Row>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      fullWidth: false,
      evenRowBackgroundColor: "var(--skel-DataTable_even-row-background-default-color)",
      oddRowBackgroundColor: "var(--skel-DataTable_odd-row-background-default-color)",
      sortingState: undefined,
    },
    ["columns", "rows", "horizontalRuledLine", "verticalRuledLine", "headerCell", "emptyState"],
  );

  const aligns: Accessor<Record<ColumnId, ColumnAlign>> = createMemo(() => {
    return objectFromEntries(props.columns.map((column) => [column.id, determineAlign(column)]));
  });

  function determineAlign(column: Column): ColumnAlign {
    if (column.align !== undefined) return column.align;

    return (
      findMostFrequentValue(
        props.rows.map((row) => {
          switch (typeof row[column.id]) {
            case "number":
            case "bigint":
              return "right";
            case "boolean":
              return "center";
            default:
              return "left";
          }
        }),
      ) ?? "left"
    );
  }

  function findMostFrequentValue<T>(array: readonly T[]): T | undefined {
    if (array.length === 0) return undefined;

    const valueToCount = new Map<T, number>();
    for (const value of array) {
      const existing = valueToCount.get(value) ?? 0;
      valueToCount.set(value, existing + 1);
    }
    const [first, ...entries] = [...valueToCount.entries()];
    let [candidateValue, candidateCount] = first;
    for (const [value, count] of entries) {
      if (candidateCount < count) {
        candidateCount = count;
        candidateValue = value;
      }
    }
    return candidateValue;
  }

  const [sortingState, setSortingState] = createSignal(props.sortingState);
  createEffect(() => setSortingState(props.sortingState));

  const sortedRows = createMemo(() => {
    const result = props.rows.slice();
    if (sortingState() === undefined) return result;

    const sortingColumn = props.columns.find((column) => column.id === sortingState()?.columnId);
    if (sortingColumn === undefined) return result;
    const sortingColumnId = sortingState().columnId;

    result.sort((row1, row2) => {
      const value1 = row1[sortingColumnId];
      const value2 = row2[sortingColumnId];
      const compareFunction = getCompareFunction(sortingColumn);
      return compareFunction(value1, value2, row1, row2);
    });

    if (sortingState().reversed) {
      result.reverse();
    }

    return result;
  });

  function compareInStandardWay(value1: unknown, value2: unknown, row1: Row, row2: Row): number {
    if (typeof value1 === typeof value2) {
      if (typeof value1 === "number") {
        return value1 - (value2 as number);
      }
      if (typeof value1 === "bigint") {
        const value1AsString = String(value1);
        const value2AsString = String(value2);
        return value1AsString
          .padStart(value2AsString.length, "0")
          .localeCompare(value2AsString.padStart(value1AsString.length, "0"));
      }
      if (typeof value1 === "boolean") {
        // true is above false.
        return (value1 ? 0 : 1) - (value2 ? 0 : 1);
      }
      if (value1 instanceof Date && value2 instanceof Date) {
        return value1.getTime() - value2.getTime();
      }

      return String(value1).localeCompare(String(value2));
    } else {
      return (typeof value1).localeCompare(typeof value2);
    }
  }

  function getColumnTitle(column: Column): string {
    return column.title ?? column.id;
  }

  function getCompareFunction(column: Column): CompareFunction<Row> {
    if (typeof column.sortable === "function") return column.sortable;

    return compareInStandardWay;
  }

  function onClickSortButton(columnId: string) {
    if (sortingState()?.columnId === columnId) {
      setSortingState({ columnId, reversed: !sortingState().reversed });
    } else {
      setSortingState({ columnId, reversed: false });
    }
  }

  return (
    <div
      class={joinClasses(props, "skel-DataTable_root", {
        "skel-DataTable_full-width": props.fullWidth,
      })}
      style={joinStyle(props.style, {
        "--skel-DataTable_template-columns": Array(props.columns.length + 1)
          .fill("max-content")
          .join(" auto "),
        "--skel-data-table-column-count": props.columns.length,
        "--skel-DataTable_even-row-background-color": props.evenRowBackgroundColor,
        "--skel-DataTable_odd-row-background-color": props.oddRowBackgroundColor,
      })}
      {...restProps}
    >
      <div class="skel-DataTable_horizontal-ruled-line">
        <Slot content={props.horizontalRuledLine} params={{ verticalIndex: 0 }}>
          <Divider />
        </Slot>
      </div>

      <div class="skel-DataTable_header">
        <For each={props.columns}>
          {(column, horizontalIndex) => (
            <>
              <div class="skel-DataTable_vertical-ruled-line">
                <Slot
                  content={props.verticalRuledLine}
                  params={{ verticalIndex: 0, horizontalIndex: horizontalIndex() }}
                >
                  <Divider direction="vertical" />
                </Slot>
              </div>

              <Gravity
                to={aligns()[column.id]}
                class="skel-DataTable_cell"
                data-column-id={column.id}
              >
                <div class="skel-DataTable_column-title" data-column-id={column.id}>
                  <Slot
                    content={props.headerCell}
                    params={{ columnId: column.id, columnTitle: getColumnTitle(column) }}
                  >
                    <span style="white-space: pre-wrap">{getColumnTitle(column)}</span>
                  </Slot>
                </div>
                <Show when={column.sortable}>
                  <Show
                    when={sortingState()?.columnId === column.id}
                    fallback={
                      <IconButton
                        class="skel-DataTable_sort-button"
                        src={arrowDownIcon}
                        iconColor="var(--skel-DataTable_sort-icon-default-inactive-color)"
                        onClick={() => onClickSortButton(column.id)}
                      />
                    }
                  >
                    <IconButton
                      class="skel-DataTable_sort-button"
                      src={arrowDownIcon}
                      iconColor="var(--skel-DataTable_sort-icon-default-active-color)"
                      data-reversed={sortingState().reversed}
                      onClick={() => onClickSortButton(column.id)}
                    />
                  </Show>
                </Show>
              </Gravity>
            </>
          )}
        </For>

        <div class="skel-DataTable_vertical-ruled-line">
          <Slot
            content={props.verticalRuledLine}
            params={{ verticalIndex: 0, horizontalIndex: props.columns.length }}
          >
            <Divider direction="vertical" />
          </Slot>
        </div>
      </div>

      <For
        each={sortedRows()}
        fallback={
          <>
            <div class="skel-DataTable_horizontal-ruled-line">
              <Slot content={props.horizontalRuledLine} params={{ verticalIndex: 1 }}>
                <Divider />
              </Slot>
            </div>
            <div class="skel-DataTable_empty-state">
              <div class="skel-DataTable_vertical-ruled-line">
                <Slot
                  content={props.verticalRuledLine}
                  params={{ verticalIndex: 1, horizontalIndex: 0 }}
                >
                  <Divider direction="vertical" />
                </Slot>
              </div>
              <div class="skel-DataTable_empty-state-cell">
                <Slot content={props.emptyState} params={{}}>
                  <Gravity class="skel-DataTable_empty-message">
                    {i18n.literals.dataTableEmptyMessage}
                  </Gravity>
                </Slot>
              </div>
              <div class="skel-DataTable_vertical-ruled-line">
                <Slot
                  content={props.verticalRuledLine}
                  params={{ verticalIndex: 1, horizontalIndex: props.columns.length }}
                >
                  <Divider direction="vertical" />
                </Slot>
              </div>
            </div>
          </>
        }
      >
        {(row, index) => (
          <>
            <div class="skel-DataTable_horizontal-ruled-line">
              <Slot content={props.horizontalRuledLine} params={{ verticalIndex: index() + 1 }}>
                <Divider />
              </Slot>
            </div>

            <div
              class="skel-DataTable_row"
              classList={{
                "skel-DataTable_even-row": index() % 2 === 0,
                "skel-DataTable_odd-row": index() % 2 === 1,
                "skel-DataTable_clickable-row": props.onClickRow !== undefined,
              }}
              onClick={() => props.onClickRow?.(row)}
            >
              <For each={props.columns}>
                {(column, horizontalIndex) => (
                  <>
                    <div class="skel-DataTable_vertical-ruled-line">
                      <Slot
                        content={props.verticalRuledLine}
                        params={{ verticalIndex: index() + 1, horizontalIndex: horizontalIndex() }}
                      >
                        <Divider direction="vertical" />
                      </Slot>
                    </div>

                    <Gravity
                      to={aligns()[column.id]}
                      class="skel-DataTable_cell"
                      data-column-id={column.id}
                    >
                      <Slot
                        content={column.cell}
                        params={{
                          row,
                          columnId: column.id,
                          value: row[column.id],
                        }}
                      >
                        <DataTableCell value={row[column.id]} />
                      </Slot>
                    </Gravity>
                  </>
                )}
              </For>

              <div class="skel-DataTable_vertical-ruled-line">
                <Slot
                  content={props.verticalRuledLine}
                  params={{ verticalIndex: index() + 1, horizontalIndex: props.columns.length }}
                >
                  <Divider direction="vertical" />
                </Slot>
              </div>
            </div>
          </>
        )}
      </For>

      <div class="skel-DataTable_horizontal-ruled-line">
        <Slot content={props.horizontalRuledLine} params={{ verticalIndex: props.rows.length + 1 }}>
          <Divider />
        </Slot>
      </div>
    </div>
  );
}
