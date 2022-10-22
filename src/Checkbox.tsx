import css from "./Checkbox.scss";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type CheckboxProps = SkelProps<
  {
    checked?: boolean;
    value?: string | undefined;
    disabled?: boolean;
    onChangeChecked?: (checked: boolean) => void;
  },
  "label"
>;

export function Checkbox(rawProps: CheckboxProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      checked: false,
      value: undefined,
      disabled: false,
    },
    ["onChangeChecked"],
  );

  function onChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      props.onChangeChecked?.(event.target.checked);
    }
  }

  return (
    <label
      class={joinClasses(rawProps, "skel-Checkbox_root", {
        "skel-Checkbox_disabled": props.disabled,
      })}
      {...restProps}
    >
      <input
        type="checkbox"
        class="skel-Checkbox_checkbox"
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={onChange}
      />
      <div class="skel-Checkbox_children">{rawProps.children}</div>
    </label>
  );
}
