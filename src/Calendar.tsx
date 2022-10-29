import dayjs, { Dayjs } from 'dayjs'
import { createEffect, createSignal, For } from 'solid-js'
import css from './Calendar.scss'
import { IconButton } from './IconButton'
import chevronLeftIcon from './image/chevron-left.svg'
import chevronRightIcon from './image/chevron-right.svg'
import { i18n } from './utility/i18n'
import { until } from './utility/others'
import { joinClasses, joinStyle, prepareProps, SkelProps, SkelSlot } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type CalendarProps = SkelProps<{
  month?: Date
  hideMonthMoveButton?: boolean
  onChangeMonth?: (month: Date) => void
  children?: SkelSlot<{ date: Date }>
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

  // Dayjs-Date adapters
  const selectedMonth_ = () => dayjs(selectedMonth())
  const setSelectedMonth_ = (date: Dayjs) => changeMonth(date.toDate())

  const firstDateOfSelectedMonth = () => selectedMonth_().date(1)
  const firstDateOfSelectedCalendar = () => firstDateOfSelectedMonth().subtract(firstDateOfSelectedMonth().day(), 'day')

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
          onClick={() => setSelectedMonth_(selectedMonth_().subtract(1, 'month'))}
          size="1.6em"
        />
        <div class="skel-Calendar_year-month">
          <span class="skel-Calendar_year">{selectedMonth_().format(i18n.literals.calendarYearTemplate)}</span>
          <span class="skel-Calendar_month">{selectedMonth_().format(i18n.literals.calendarMonthTemplate)}</span>
        </div>
        <IconButton
          class="skel-Calendar_month-move-button skel-Calendar_next-month-button"
          classList={{ 'skel-Calendar_hidden': props.hideMonthMoveButton }}
          src={chevronRightIcon}
          onClick={() => setSelectedMonth_(selectedMonth_().add(1, 'month'))}
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
                  const date = () => firstDateOfSelectedCalendar().add(weakIndex, 'week').add(day(), 'day')
                  return (
                    <div
                      class="skel-Calendar_cell"
                      classList={{
                        'skel-Calendar_other-month':
                          date().isAfter(selectedMonth(), 'month') || date().isBefore(selectedMonth(), 'month'),
                      }}
                      data-day={day()}
                    >
                      <Slot content={rawProps.children} params={{ date: date().toDate() }}>
                        {date().date()}
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
