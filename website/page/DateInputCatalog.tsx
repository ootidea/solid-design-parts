import { createRoot, createSignal } from 'solid-js'
import { DateInput } from '../../src/DateInput'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal(new Date())

export const DateInputCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
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
      title: 'Bind to signal',
      children: (
        <>
          <DateInput value={value()} onChangeValue={setValue} />
          <div>value: {value() === undefined ? 'undefined' : value()?.toLocaleDateString()}</div>
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
      title: 'Disable date',
      direction: 'horizontal',
      children: (
        <>
          <DateInput disabledDate={(date) => date.getDay() % 3 === 0} />
        </>
      ),
    },
    {
      title: 'Clear button',
      direction: 'horizontal',
      children: (
        <>
          <DateInput placeholder="placeholder" value={new Date()} showClearButton />
        </>
      ),
    },
    {
      title: 'Change date format',
      direction: 'horizontal',
      children: (
        <>
          <DateInput format={({ value }) => value?.toISOString()} />
        </>
      ),
    },
  ],
}))
