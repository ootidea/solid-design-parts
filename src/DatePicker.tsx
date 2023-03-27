import { isSameDay, startOfMonth } from 'date-fns'
import { createSignalObject } from 'solid-signal-object'
import { Calendar } from './Calendar'
import css from './DatePicker.scss'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type DatePickerProps = Props<{
  value?: Date | undefined
  month?: Date
  disabled?: (date: Date) => boolean
  enableDeselection?: boolean
  onChangeValue?: (value: Date | undefined) => void
  onChangeMonth?: (month: Date) => void
}>

export function DatePicker(rawProps: DatePickerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      month: startOfMonth(new Date()),
      enableDeselection: false,
    },
    ['value', 'disabled', 'onChangeValue', 'onChangeMonth']
  )

  const valueSignal = createSignalObject<Date | undefined>(props.value)
  function changeValue(value: Date) {
    if (props.enableDeselection && valueSignal.value !== undefined && isSameDay(value, valueSignal.value)) {
      valueSignal.value = undefined
    } else {
      valueSignal.value = value
    }
    props.onChangeValue?.(valueSignal.value)
  }

  return (
    <Calendar
      class={joinClasses(rawProps, 'solid-design-parts-DatePicker_root')}
      month={props.month}
      onChangeMonth={props.onChangeMonth}
      {...restProps}
    >
      {({ date }) => (
        <button
          class="solid-design-parts-DatePicker_date-cell"
          type="button"
          aria-selected={valueSignal.value !== undefined && isSameDay(date, valueSignal.value)}
          disabled={props.disabled?.(date)}
          onClick={() => changeValue(date)}
        >
          {date.getDate()}
        </button>
      )}
    </Calendar>
  )
}
