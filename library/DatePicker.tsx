import { endOfDay, isBefore, isSameDay, startOfDay, startOfMonth } from 'date-fns'
import { Calendar } from './Calendar'
import './common.scss'
import './DatePicker.scss'
import { createDeferEffect, createNormalizedSignalObject, joinClasses, prepareProps, Props } from './utility/props'

export type DatePickerProps = Props<{
  value?: Date | undefined
  month?: Date
  min?: Date
  max?: Date
  disabled?: (date: Date) => boolean
  enableDeselection?: boolean
  onChangeValue?: (value: Date | undefined) => void
  onChangeMonth?: (month: Date) => void
}>

export function DatePicker(rawProps: DatePickerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      month: startOfMonth(rawProps.value ?? new Date()),
      enableDeselection: false,
    },
    ['value', 'min', 'max', 'disabled', 'onChangeValue', 'onChangeMonth']
  )

  const valueSignal = createNormalizedSignalObject(
    props.value,
    () => (props.value !== undefined && isDisabled(props.value) ? undefined : props.value),
    props.onChangeValue
  )
  createDeferEffect(valueSignal.get, () => {
    props.onChangeValue?.(valueSignal.value)
  })

  function isDisabled(date: Date): boolean {
    if (props.min !== undefined && isBefore(date, startOfDay(props.min))) {
      return true
    }
    if (props.max !== undefined && isBefore(endOfDay(props.max), date)) {
      return true
    }
    return Boolean(props.disabled?.(date))
  }

  return (
    <Calendar
      {...restProps}
      class={joinClasses(rawProps, 'solid-design-parts-DatePicker_root')}
      month={props.month}
      min={props.min}
      max={props.max}
      onChangeMonth={props.onChangeMonth}
    >
      {({ date }) => (
        <button
          class="solid-design-parts-DatePicker_date-cell"
          type="button"
          aria-selected={valueSignal.value !== undefined && isSameDay(date, valueSignal.value)}
          disabled={isDisabled(date)}
          onClick={() => {
            if (props.enableDeselection && valueSignal.value !== undefined && isSameDay(date, valueSignal.value)) {
              valueSignal.value = undefined
            } else {
              valueSignal.value = date
            }
          }}
        >
          {date.getDate()}
        </button>
      )}
    </Calendar>
  )
}
