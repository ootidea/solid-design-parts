import { createRoot, createSignal } from 'solid-js'
import { MultiSelect } from '../../src/MultiSelect'
import { Catalog } from './ComponentCatalog'

const [selected, setSelected] = createSignal(new Set(['Other']), { equals: false })

export const MultiSelectCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <MultiSelect values={['Female', 'Male', 'Other']} />
          <MultiSelect values={['Female', 'Male', 'Other']} placeholder="placeholder" />
          <MultiSelect values={['Female', 'Male', 'Other']} selected={new Set(['Female', 'Male'])} />
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
          <MultiSelect values={['Female', 'Male', 'Other']} selected={selected()} onChangeSelected={setSelected} />
          <div>{`selected: {${[...selected()].map((value) => JSON.stringify(value)).join(', ')}}`}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <MultiSelect values={['Female', 'Male', 'Other']} placeholder="placeholder" disabled />
          <MultiSelect values={['Female', 'Male', 'Other']} selected={new Set(['Female', 'Male'])} disabled />
        </>
      ),
    },
    {
      title: 'Error message',
      children: (
        <>
          <MultiSelect values={['Female', 'Male', 'Other']} errorMessage="Invalid value" />
        </>
      ),
    },
    {
      title: 'Validation',
      children: (
        <>
          <MultiSelect
            values={['Female', 'Male', 'Other']}
            errorMessage={(selected) => {
              if (selected.size < 2) return 'Select multiple options'

              return
            }}
          />
        </>
      ),
    },
    {
      title: 'Validate initial value',
      description: 'If validateImmediately option is set, it perform validation even if the user did not edit it.',
      children: (
        <>
          <MultiSelect
            values={['Female', 'Male', 'Other']}
            validateImmediately
            errorMessage={(selected) => {
              if (selected.size < 2) return 'Select multiple options'

              return
            }}
          />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <MultiSelect values={['Female', 'Male', 'Other']} required />
          <MultiSelect
            values={['Female', 'Male', 'Other']}
            required
            validateImmediately
            errorMessage="One or more selections required"
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
          <MultiSelect fullWidth values={['Female', 'Male', 'Other']} placeholder="placeholder" />
        </>
      ),
    },
  ],
}))
