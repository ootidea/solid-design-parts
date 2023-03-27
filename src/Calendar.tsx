import { rangeTo } from 'base-up'
import { addDays, addMonths, addWeeks, format, isSameMonth, setDate, subDays, subMonths } from 'date-fns'
import { For } from 'solid-js'
import { createMemoObject } from 'solid-signal-object'
import css from './Calendar.scss'
import { IconButton } from './IconButton'
import chevronLeftIcon from './image/chevron-left.svg'
import chevronRightIcon from './image/chevron-right.svg'
import { i18n } from './utility/i18n'
import { createInjectableSignal, joinClasses, joinStyle, prepareProps, Props, SlotProp } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type CalendarProps = Props<{
  month?: Date
  hideMonthMoveButton?: boolean
  onChangeMonth?: (month: Date) => void
  children?: SlotProp<{ date: Date }>
}>

export function Calendar(rawProps: CalendarProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      month: new Date(),
      hideMonthMoveButton: false,
    },
    ['onChangeMonth', 'style']
  )

  const [selectedMonth, setSelectedMonth] = createInjectableSignal(props, 'month', false)
  function changeMonth(month: Date) {
    setSelectedMonth(month)
    props.onChangeMonth?.(month)
  }

  const firstDateOfSelectedMonth = () => setDate(selectedMonth(), 1)
  const firstDateOfSelectedCalendar = () => subDays(firstDateOfSelectedMonth(), firstDateOfSelectedMonth().getDay())

  const dayNames = [
    i18n.literals.calendarSunday,
    i18n.literals.calendarMonday,
    i18n.literals.calendarTuesday,
    i18n.literals.calendarWednesday,
    i18n.literals.calendarThursday,
    i18n.literals.calendarFriday,
    i18n.literals.calendarSaturday,
  ]

  return (
    <div
      class={joinClasses(rawProps, 'solid-design-parts-Calendar_root')}
      style={joinStyle(props.style, {
        '--solid-design-parts-Calendar_year-month-order': i18n.literals.calendarYearMonthOrder,
      })}
      {...restProps}
    >
      <div class="solid-design-parts-Calendar_year-month-area">
        <IconButton
          class="solid-design-parts-Calendar_month-move-button solid-design-parts-Calendar_prev-month-button"
          classList={{ 'solid-design-parts-Calendar_hidden': props.hideMonthMoveButton }}
          src={chevronLeftIcon}
          onClick={() => changeMonth(subMonths(selectedMonth(), 1))}
          size="1.6em"
        />
        <div class="solid-design-parts-Calendar_year-month">
          <span class="solid-design-parts-Calendar_year">
            {format(selectedMonth(), i18n.literals.calendarYearTemplate)}
          </span>
          <span class="solid-design-parts-Calendar_month">
            {format(selectedMonth(), i18n.literals.calendarMonthTemplate)}
          </span>
        </div>
        <IconButton
          class="solid-design-parts-Calendar_month-move-button solid-design-parts-Calendar_next-month-button"
          classList={{ 'solid-design-parts-Calendar_hidden': props.hideMonthMoveButton }}
          src={chevronRightIcon}
          onClick={() => changeMonth(addMonths(selectedMonth(), 1))}
          size="1.6em"
        />
      </div>

      <div class="solid-design-parts-Calendar_grid">
        <div class="solid-design-parts-Calendar_day-row">
          <For each={dayNames}>
            {(dayName, day) => (
              <div class="solid-design-parts-Calendar_cell" data-day={day()}>
                {dayName}
              </div>
            )}
          </For>
        </div>

        <For each={rangeTo(6)}>
          {(weakIndex) => (
            <div class="solid-design-parts-Calendar_date-row">
              <For each={dayNames}>
                {(_, day) => {
                  const date = createMemoObject(() =>
                    addDays(addWeeks(firstDateOfSelectedCalendar(), weakIndex), day())
                  )
                  return (
                    <div
                      class="solid-design-parts-Calendar_cell"
                      classList={{
                        'solid-design-parts-Calendar_other-month': !isSameMonth(date.value, selectedMonth()),
                      }}
                      data-day={day()}
                    >
                      <Slot content={rawProps.children} params={{ date: date.value }}>
                        {date.value.getDate()}
                      </Slot>
                    </div>
                  )
                }}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
