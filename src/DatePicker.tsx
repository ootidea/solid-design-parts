import { isSameDay, startOfMonth } from 'date-fns'
import { createSignal } from 'solid-js'
import { Calendar } from './Calendar'
import css from './DatePicker.scss'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type DatePickerProps = Props<{
  value?: Date | undefined
  month?: Date
  disabled?: (date: Date) => boolean
  onChangeValue?: (value: Date) => void
  onChangeMonth?: (month: Date) => void
}>

export function DatePicker(rawProps: DatePickerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      value: undefined,
      month: startOfMonth(new Date()),
    },
    ['disabled', 'onChangeValue', 'onChangeMonth']
  )

  const [value, setValue] = createSignal<Date | undefined>(props.value)
  function changeValue(value: Date) {
    setValue(value)
    props.onChangeValue?.(value)
  }

  return (
    <Calendar
      class={joinClasses(rawProps, 'mantle-ui-DatePicker_root')}
      month={props.month}
      onChangeMonth={props.onChangeMonth}
      {...restProps}
    >
      {({ date }) => (
        <button
          class="mantle-ui-DatePicker_date-cell"
          type="button"
          aria-selected={value() !== undefined && isSameDay(date, value() ?? Number.NaN)}
          disabled={props.disabled?.(date)}
          onClick={() => changeValue(date)}
        >
          {date.getDate()}
        </button>
      )}
    </Calendar>
  )
}
