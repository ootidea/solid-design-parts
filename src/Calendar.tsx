import { addDays, addMonths, addWeeks, format, isSameMonth, setDate, subDays, subMonths } from 'date-fns'
import { createEffect, createMemo, createSignal, For } from 'solid-js'
import css from './Calendar.scss'
import { IconButton } from './IconButton'
import chevronLeftIcon from './image/chevron-left.svg'
import chevronRightIcon from './image/chevron-right.svg'
import { i18n } from './utility/i18n'
import { until } from './utility/others'
import { joinClasses, joinStyle, prepareProps, SkelProps, SlotProp } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type CalendarProps = SkelProps<{
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

  const [selectedMonth, setSelectedMonth] = createSignal(props.month, { equals: false })
  createEffect(() => setSelectedMonth(props.month))

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
      class={joinClasses(rawProps, 'skel-Calendar_root')}
      style={joinStyle(props.style, {
        '--skel-Calendar_year-month-order': i18n.literals.calendarYearMonthOrder,
      })}
      {...restProps}
    >
      <div class="skel-Calendar_year-month-area">
        <IconButton
          class="skel-Calendar_month-move-button skel-Calendar_prev-month-button"
          classList={{ 'skel-Calendar_hidden': props.hideMonthMoveButton }}
          src={chevronLeftIcon}
          onClick={() => changeMonth(subMonths(selectedMonth(), 1))}
          size="1.6em"
        />
        <div class="skel-Calendar_year-month">
          <span class="skel-Calendar_year">{format(selectedMonth(), i18n.literals.calendarYearTemplate)}</span>
          <span class="skel-Calendar_month">{format(selectedMonth(), i18n.literals.calendarMonthTemplate)}</span>
        </div>
        <IconButton
          class="skel-Calendar_month-move-button skel-Calendar_next-month-button"
          classList={{ 'skel-Calendar_hidden': props.hideMonthMoveButton }}
          src={chevronRightIcon}
          onClick={() => changeMonth(addMonths(selectedMonth(), 1))}
          size="1.6em"
        />
      </div>

      <div class="skel-Calendar_grid">
        <div class="skel-Calendar_day-row">
          <For each={dayNames}>
            {(dayName, day) => (
              <div class="skel-Calendar_cell" data-day={day()}>
                {dayName}
              </div>
            )}
          </For>
        </div>

        <For each={until(6)}>
          {(weakIndex) => (
            <div class="skel-Calendar_date-row">
              <For each={dayNames}>
                {(_, day) => {
                  const date = createMemo(() => addDays(addWeeks(firstDateOfSelectedCalendar(), weakIndex), day()))
                  return (
                    <div
                      class="skel-Calendar_cell"
                      classList={{
                        'skel-Calendar_other-month': !isSameMonth(date(), selectedMonth()),
                      }}
                      data-day={day()}
                    >
                      <Slot content={rawProps.children} params={{ date: date() }}>
                        {date().getDate()}
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
