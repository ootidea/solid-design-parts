import { setOf } from 'base-up'
import { createRoot, createSignal } from 'solid-js'
import { MultiSelect } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [selected, setSelected] = createSignal(setOf('macOS', 'Linux'))

export const MultiSelectCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <MultiSelect values={['Windows', 'macOS', 'Linux']} />
          <MultiSelect values={['PC', 'Smartphone', 'Tablet']} placeholder="Devices" />
          <MultiSelect values={['Windows', 'macOS', 'Linux']} selected={new Set(['Windows', 'macOS'])} />
        </>
      ),
    },
    {
      title: 'Change titles',
      children: (
        <>
          <MultiSelect values={['dog', 'cat', 'rabbit']} labels={{ dog: 'Dog🐶', cat: 'Cat😺', rabbit: 'Rabbit🐰' }} />
        </>
      ),
    },
    {
      title: {
        default: (
          <>
            Binding <code>selected</code> to a signal
          </>
        ),
        ja: (
          <>
            <code>selected</code>とsignalの双方向バインディング
          </>
        ),
      },
      children: (
        <>
          <MultiSelect values={['Windows', 'macOS', 'Linux']} selected={selected()} onChangeSelected={setSelected} />
          <div>{`selected: {${[...selected()].map((value) => JSON.stringify(value)).join(', ')}}`}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <MultiSelect values={['Windows', 'macOS', 'Linux']} placeholder="Operating systems" disabled />
          <MultiSelect values={['Windows', 'macOS', 'Linux']} selected={new Set(['Windows', 'macOS'])} disabled />
        </>
      ),
    },
    {
      title: 'Error state',
      children: (
        <>
          <MultiSelect values={['Windows', 'macOS', 'Linux']} error="Something went wrong." />
        </>
      ),
    },
    {
      title: 'Required',
      description: (
        <>
          Using <code>required</code> makes one or more selections mandatory.
        </>
      ),
      children: (
        <>
          <MultiSelect values={['Windows', 'macOS', 'Linux']} required />
          <MultiSelect values={['Windows', 'macOS', 'Linux']} required error="One or more selections required." />
        </>
      ),
    },
    {
      title: 'Minimum and maximum selection count',
      children: (
        <>
          <MultiSelect
            placeholder="Select up to two devices"
            values={['PC', 'Smartphone', 'Tablet', 'Smartwatch']}
            max={2}
          />
          <MultiSelect values={['Windows', 'macOS', 'Linux']} min={2} error="Select two or more." />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <MultiSelect
            placeholder="Select an odd number of items"
            values={['Windows', 'macOS', 'Linux']}
            error={(selected) => selected.size % 2 !== 1 && 'Select an odd number of items.'}
          />
        </>
      ),
    },
    {
      title: 'Validate initial value',
      description: (
        <>
          If <code>validateImmediately</code> option is set, it perform validation even if the user did not edit it.
        </>
      ),
      children: (
        <>
          <MultiSelect values={['Windows', 'macOS', 'Linux']} required validateImmediately />
        </>
      ),
    },
    {
      title: 'Search',
      children: (
        <>
          <MultiSelect
            showSearchBox
            values={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
          />
        </>
      ),
    },
    {
      title: 'Full width',
      children: (
        <>
          <MultiSelect fullWidth values={['Windows', 'macOS', 'Linux']} placeholder="Operating systems" />
        </>
      ),
    },
  ],
}))
