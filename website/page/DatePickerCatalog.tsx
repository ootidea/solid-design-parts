import { createRoot, createSignal } from 'solid-js'
import { DatePicker } from '../../src/DatePicker'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal<Date | undefined>(undefined)

export const DatePickerCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>DatePicker</code> is a component for selecting a date from a calendar.
    </>
  ),
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
      title: 'Displaying the specified month',
      children: (
        <>
          <DatePicker month={new Date(1999, 0)} />
        </>
      ),
    },
    {
      title: 'Binding the value to signal',
      children: (
        <>
          <DatePicker value={value()} onChangeValue={setValue} />
          <div>value: {value() === undefined ? 'undefined' : value()?.toLocaleDateString()}</div>
        </>
      ),
    },
    {
      title: 'Minimum and maximum date',
      children: (
        <>
          <DatePicker min={new Date()} />
          <DatePicker max={new Date()} />
        </>
      ),
    },
    {
      title: 'Disabled DatePicker',
      children: (
        <>
          <DatePicker disabled={(date) => date.getDay() % 3 === 0} />
        </>
      ),
    },
    {
      title: 'Enabling deselection',
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
