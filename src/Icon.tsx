import css from "./Icon.scss";
import { joinClasses, joinStyle, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type IconProps = SkelProps<{ src: string; size?: string; color?: string; rotate?: string }>;

export function Icon(rawProps: IconProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: "var(--skel-Icon_default-size)",
      color: "var(--skel-Icon_default-color)",
      rotate: "0deg",
    },
    ["src", "style"],
  );

  return (
    <div
      class={joinClasses(rawProps, "skel-Icon_root")}
      style={joinStyle(rawProps.style, {
        "--skel-Icon_url": `url('${props.src}')`,
        "--skel-Icon_size": props.size,
        "--skel-Icon_color": props.color,
        "--skel-Icon_rotate": props.rotate,
      })}
      {...restProps}
    />
  );
}
