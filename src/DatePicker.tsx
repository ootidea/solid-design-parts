import dayjs from "dayjs";
import { createSignal } from "solid-js";
import { Calendar } from "./Calendar";
import css from "./DatePicker.scss";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type DatePickerProps = SkelProps<{
  value?: Date | undefined;
  month?: Date;
  disabled?: (date: Date) => boolean;
  onChangeValue?: (value: Date) => void;
  onChangeMonth?: (month: Date) => void;
}>;

export function DatePicker(rawProps: DatePickerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      value: undefined,
      month: dayjs().startOf("date").toDate(),
    },
    ["disabled", "onChangeValue", "onChangeMonth"],
  );

  const [value, setValue] = createSignal<Date | undefined>(props.value);
  function changeValue(value: Date) {
    setValue(value);
    props.onChangeValue?.(value);
  }

  return (
    <Calendar
      class={joinClasses(rawProps, "skel-DatePicker_root")}
      month={props.month}
      onChangeMonth={props.onChangeMonth}
      {...restProps}
    >
      {({ date }) => (
        <button
          class="skel-DatePicker_date-cell"
          classList={{
            "skel-DatePicker_selected":
              value() !== undefined && dayjs(date).isSame(value(), "date"),
          }}
          type="button"
          disabled={props.disabled?.(date)}
          onClick={() => changeValue(date)}
        >
          {date.getDate()}
        </button>
      )}
    </Calendar>
  );
}
