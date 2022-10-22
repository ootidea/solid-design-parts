import { JSX } from "solid-js";
import { Gravity } from "./Gravity";
import { StretchLayout } from "./StretchLayout";
import css from "./TextInput.scss";
import { LiteralUnion } from "./utility/others";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type TextInputProps = SkelProps<{
  value?: string;
  placeholder?: string;
  type?: LiteralUnion<
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
  >;
  disabled?: boolean;
  prefix?: JSX.Element;
  postfix?: JSX.Element;
  prepend?: JSX.Element;
  append?: JSX.Element;
  onChangeValue?: (value: string) => void;
}>;

export function TextInput(rawProps: TextInputProps) {
  const [props, restProps] = prepareProps(rawProps, { disabled: false }, [
    "value",
    "placeholder",
    "type",
    "prefix",
    "postfix",
    "prepend",
    "append",
    "onChangeValue",
  ]);

  function onInput(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      props.onChangeValue?.(event.target.value);
    }
  }

  return (
    <StretchLayout
      class={joinClasses(rawProps, "skel-TextInput_root", {
        "skel-TextInput_disabled": rawProps.disabled,
      })}
      stretchAt={1}
      {...restProps}
    >
      <Gravity class="skel-TextInput_prefix">{rawProps.prefix}</Gravity>
      <StretchLayout class="skel-TextInput_inner" stretchAt={1}>
        <Gravity class="skel-TextInput_prepend">{rawProps.prepend}</Gravity>
        <input
          class="skel-TextInput_input"
          attr:value={props.value}
          placeholder={props.placeholder}
          type={props.type}
          onInput={onInput}
        />
        <Gravity class="skel-TextInput_append">{rawProps.append}</Gravity>
      </StretchLayout>
      <Gravity class="skel-TextInput_postfix">{rawProps.postfix}</Gravity>
    </StretchLayout>
  );
}
