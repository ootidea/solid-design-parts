import { JSX } from "solid-js";
import css from "./DataTableCell.scss";
import { Icon } from "./Icon";
import checkIcon from "./image/check.svg";
import { call, DiscriminatedUnion } from "./utility/others";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type DataTableCellProps<T extends string> = SkelProps<{ value: unknown }>;

export function DataTableCell<T extends string>(rawProps: DataTableCellProps<T>) {
  const [props, restProps] = prepareProps(rawProps, {}, ["value"]);

  return (
    // Run in JSX to be reactive.
    <>
      {call(() => {
        const analysisResult = analyze(rawProps.value);
        return (
          <div
            class={joinClasses(props, "skel-DataTableCell_root")}
            data-type={analysisResult.type}
            {...restProps}
          >
            {render(analysisResult)}
          </div>
        );
      })}
    </>
  );
}

function render(analysisResult: AnalysisResult): JSX.Element {
  switch (analysisResult.type) {
    case "Date":
      return analysisResult.value.toLocaleDateString();
    case "URL":
      return <a href={String(analysisResult.value)}>{String(analysisResult.value)}</a>;
    case "boolean":
      if (analysisResult.value) return <Icon src={checkIcon} color="currentColor" />;
      else return <Icon style="visibility: hidden" src={checkIcon} color="currentColor" />;
    case "bigint":
    case "number":
      return analysisResult.value.toLocaleString();
    case "string":
      return analysisResult.value;
    case "unknown":
      return String(analysisResult.value);
  }
}

type AnalysisResult = DiscriminatedUnion<{
  Date: { value: Date };
  URL: { value: URL };
  boolean: { value: boolean };
  number: { value: number };
  bigint: { value: bigint };
  string: { value: string };
  unknown: { value: unknown };
}>;

function analyze(value: unknown): AnalysisResult {
  if (typeof value === "boolean") return { type: "boolean", value };
  if (typeof value === "number") return { type: "number", value };
  if (typeof value === "bigint") return { type: "bigint", value };

  if (value instanceof Date) return { type: "Date", value };
  if (value instanceof URL) return { type: "URL", value };

  if (typeof value === "string") {
    try {
      return { type: "URL", value: new URL(value) };
    } catch {
      return { type: "string", value };
    }
  }

  return { type: "unknown", value };
}
