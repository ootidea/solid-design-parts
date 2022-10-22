import { createMemo } from "solid-js";
import css from "./Spinner.scss";
import { joinClasses, joinStyle, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type SpinnerProps = SkelProps<{
  size?: string;
  thickness?: number;
  frequency?: number;
  color?: string;
}>;

export function Spinner(rawProps: SpinnerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: "var(--skel-Spinner_default-size)",
      thickness: 25,
      frequency: 1.4,
      color: "var(--skel-primary-color)",
    },
    ["style"],
  );

  const svgUrl = createMemo(
    () =>
      `url('data:image/svg+xml;utf8,<svg width="200mm" height="200mm" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="${
        100 - props.thickness / 2
      }" fill="none" stroke="black" stroke-width="${props.thickness}" /></svg>')`,
  );

  return (
    <div
      class={joinClasses(rawProps, "skel-Spinner_root")}
      style={joinStyle(rawProps.style, {
        "--skel-Spinner_size": props.size,
        "--skel-Spinner_svg-url": svgUrl(),
        "--skel-Spinner_period": `${1 / props.frequency}s`,
        "--skel-Spinner_color": props.color,
      })}
      {...restProps}
    />
  );
}
