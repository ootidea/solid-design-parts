import { isSameDay, startOfMonth } from 'date-fns'
import { createSignalObject } from 'solid-signal-object'
import { Calendar } from './Calendar'
import css from './DatePicker.scss'
import { createDeferEffect, joinClasses, prepareProps, Props } from './utility/props'
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

  const initialValue = props.value !== undefined && props.disabled?.(props.value) ? undefined : props.value
  if (initialValue?.getTime() !== props.value?.getTime()) {
    props.onChangeValue?.(initialValue)
  }

  const valueSignal = createSignalObject(initialValue)
  createDeferEffect(
    () => props.value,
    () => {
      const newValue = props.value !== undefined && props.disabled?.(props.value) ? undefined : props.value
      valueSignal.value = newValue
      if (newValue?.getTime() !== props.value?.getTime()) {
        props.onChangeValue?.(newValue)
      }
    }
  )

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
