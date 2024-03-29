import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Button, Calendar } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const date = createSignalObject(new Date(), { equals: false })

export const CalendarCatalog: Catalog = createRoot(() => ({
  samples: [
    { title: { default: 'Basic example', ja: '基本例' }, children: <Calendar /> },
    {
      title: { default: 'Showing the specified month', ja: '指定した月を表示' },
      children: <Calendar month={new Date(1999, 0)} />,
    },
    {
      title: {
        default: (
          <>
            Binding <code>month</code> to a signal
          </>
        ),
        ja: (
          <>
            <code>month</code>とsignalの双方向バインディング
          </>
        ),
      },
      children: (
        <>
          <Calendar month={date.value} onChangeMonth={date.set} />
          <Button onClick={() => (date.value = new Date(2 * date.value.getTime()))}>Change month</Button>
        </>
      ),
    },
    {
      title: { default: 'Limiting the range of months', ja: '表示可能な月の範囲を設定' },
      children: (
        <>
          <Calendar min={new Date()} />
          <Calendar max={new Date()} />
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
