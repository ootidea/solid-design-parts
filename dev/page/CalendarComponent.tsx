import { createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { Calendar } from '../../src/Calendar'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function CalendarComponent() {
  const [date, setDate] = createSignal(new Date(), { equals: false })

  return (
    <article>
      <PageTitle>Calendar</PageTitle>

      <Sample title="Basic example">
        <Calendar />
      </Sample>

      <Sample title="Specify default month">
        <Calendar month={new Date(1999, 0)} />
      </Sample>

      <Sample title="Bind to signal">
        <Calendar month={date()} onChangeMonth={setDate} />
        <Button onClick={() => setDate(new Date(2 * date().getTime()))}>Change month</Button>
      </Sample>

      <Sample title="Hide month move buttons">
        <Calendar hideMonthMoveButton />
      </Sample>

      <Sample title="Overwrite cell">
        <Calendar>{({ date }) => String(date.getDate()).padStart(2, '0')}</Calendar>
      </Sample>

      <Sample title="Hide dates in other months">
        <Calendar class="hide-dates-in-other-months" />
        <style>{`
          .hide-dates-in-other-months .mantle-ui-Calendar_cell.mantle-ui-Calendar_other-month {
            visibility: hidden;
          }
        `}</style>
      </Sample>
    </article>
  )
}
