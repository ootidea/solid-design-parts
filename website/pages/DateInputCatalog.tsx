import { createRoot, createSignal } from 'solid-js'
import { DateInput } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal<Date | undefined>(new Date())

export const DateInputCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>DateInput</code> is a component for inputting a date, specifically year, month, and day.
    </>
  ),
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      direction: 'horizontal',
      children: (
        <>
          <DateInput />
          <DateInput placeholder="a little long placeholder" />
          <DateInput value={new Date()} />
        </>
      ),
    },
    {
      title: (
        <>
          Binding <code>value</code> to a signal
        </>
      ),
      children: (
        <>
          <DateInput value={value()} onChangeValue={setValue} />
          <div>value: {value() === undefined ? 'undefined' : value()?.toLocaleDateString()}</div>
        </>
      ),
    },
    {
      title: 'Minimum and maximum date',
      direction: 'horizontal',
      children: (
        <>
          <DateInput min={new Date()} placeholder="next reservation date" />
          <DateInput max={new Date()} placeholder="previous reservation date" />
        </>
      ),
    },
    {
      title: 'Disable date',
      direction: 'horizontal',
      children: (
        <>
          <DateInput disabledDate={(date) => date.getDay() % 3 === 0} />
        </>
      ),
    },
    {
      title: 'Disabled',
      direction: 'horizontal',
      children: (
        <>
          <DateInput placeholder="placeholder" disabled />
          <DateInput value={new Date()} disabled />
        </>
      ),
    },
    {
      title: 'Showing the clear button',
      direction: 'horizontal',
      children: (
        <>
          <DateInput placeholder="placeholder" value={new Date()} showClearButton />
        </>
      ),
    },
    {
      title: 'Changing date format',
      direction: 'horizontal',
      children: (
        <>
          <DateInput format={({ value }) => value?.toISOString()} />
        </>
      ),
    },
  ],
}))
