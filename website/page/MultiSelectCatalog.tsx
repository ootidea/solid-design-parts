import { createRoot, createSignal } from 'solid-js'
import { MultiSelect } from '../../src/MultiSelect'
import { Catalog } from './ComponentCatalogPage'

const [selected, setSelected] = createSignal(new Set(['macOS', 'Linux']), { equals: false })

export const MultiSelectCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
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
          <MultiSelect values={['dog', 'cat', 'rabbit']} labels={{ dog: '🐶', cat: '😺', rabbit: '🐰' }} />
        </>
      ),
    },
    {
      title: 'Bind to signal',
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
          <MultiSelect values={['Windows', 'macOS', 'Linux']} error="Invalid value" />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <MultiSelect values={['Windows', 'macOS', 'Linux']} required />
          <MultiSelect values={['Windows', 'macOS', 'Linux']} required error="One or more selections required" />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <MultiSelect
            values={['Windows', 'macOS', 'Linux']}
            error={(selected) => selected.size < 2 && 'Select multiple options'}
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
          <MultiSelect
            values={['Windows', 'macOS', 'Linux']}
            validateImmediately
            error={(selected) => selected.size < 2 && 'Select multiple options'}
          />
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
