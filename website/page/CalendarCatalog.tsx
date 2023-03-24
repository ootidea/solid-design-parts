import { createRoot, createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { Calendar } from '../../src/Calendar'
import { Catalog } from './ComponentCatalogPage'

const [date, setDate] = createSignal(new Date(), { equals: false })

export const CalendarCatalog: Catalog = createRoot(() => ({
  samples: [
    { title: 'Basic example', children: <Calendar /> },
    {
      title: 'Specify default month',
      children: <Calendar month={new Date(1999, 0)} />,
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <Calendar month={date()} onChangeMonth={setDate} />
          <Button onClick={() => setDate(new Date(2 * date().getTime()))}>Change month</Button>
        </>
      ),
    },
    {
      title: 'Hide month move buttons',
      children: (
        <>
          <Calendar hideMonthMoveButton />
        </>
      ),
    },
    {
      title: 'Overwrite cell',
      children: (
        <>
          <Calendar>{({ date }) => String(date.getDate()).padStart(2, '0')}</Calendar>
        </>
      ),
    },
    {
      title: 'Hide dates in other months',
      children: (
        <>
          <Calendar class="hide-dates-in-other-months" />
          <style>{`
          .hide-dates-in-other-months .solid-design-parts-Calendar_cell.solid-design-parts-Calendar_other-month {
            visibility: hidden;
          }
        `}</style>
        </>
      ),
    },
  ],
}))
