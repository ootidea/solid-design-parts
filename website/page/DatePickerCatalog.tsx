import { createRoot, createSignal } from 'solid-js'
import { DatePicker } from '../../src/DatePicker'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal<Date | undefined>(undefined)

export const DatePickerCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <DatePicker />
          <DatePicker value={new Date()} />
        </>
      ),
    },
    {
      title: 'Specify default month',
      children: (
        <>
          <DatePicker month={new Date(1999, 0)} />
        </>
      ),
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <DatePicker value={value()} onChangeValue={setValue} />
          <div>value: {value() === undefined ? 'undefined' : value()?.toLocaleDateString()}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <DatePicker disabled={(date) => date.getTime() < Date.now()} />
        </>
      ),
    },
    {
      title: 'Enable deselection',
      description: (
        <>
          If the <code>enableDeselection</code> option is set, clicking the selected date again will deselect it.
        </>
      ),
      children: (
        <>
          <DatePicker value={new Date()} enableDeselection />
        </>
      ),
    },
  ],
}))
