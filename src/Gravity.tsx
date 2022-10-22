import css from "./Gravity.scss";
import { EnneaPosition, toHorizontalPosition, toVerticalPosition } from "./utility/others";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type GravityProps = SkelProps<{ to?: EnneaPosition }>;

export function Gravity(rawProps: GravityProps) {
  const [props, restProps] = prepareProps(rawProps, {
    to: "center",
  });

  return (
    <div
      class={joinClasses(rawProps, "skel-Gravity_root")}
      data-horizontal-position={toHorizontalPosition(props.to)}
      data-vertical-position={toVerticalPosition(props.to)}
      {...restProps}
    >
      {rawProps.children}
    </div>
  );
}
