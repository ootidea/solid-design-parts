import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Checkboxes } from '../../src/Checkboxes'
import { Catalog } from './ComponentCatalogPage'

const selected = createSignalObject(new Set(['PC']), { equals: false })

export const CheckboxesCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Checkboxes</code> is a component that displays a group of checkboxes. The state of the input field is
      treated as a single <code>Set</code> object, not as multiple boolean values.
    </>
  ),
  samples: [
    {
      title: 'Basic sample',
      children: (
        <>
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} />
          <Checkboxes values={['dog', 'cat']} labels={{ dog: '🐶Dog', cat: '😺Cat' }} />
        </>
      ),
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <Checkboxes
            values={['PC', 'Smartphone', 'Tablet']}
            selected={selected.value}
            onChangeSelected={selected.set}
          />
          <div>{`selected: {${[...selected.value].map((value) => JSON.stringify(value)).join(', ')}}`}</div>
        </>
      ),
    },
    {
      title: 'Layout',
      children: (
        <>
          <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="vertical" values={['PC', 'Smartphone', 'Tablet']} />
          </div>
          <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes
              layout="flex-wrap"
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
          </div>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-between" values={['PC', 'Smartphone', 'Tablet']} />
          </div>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-evenly" values={['PC', 'Smartphone', 'Tablet']} />
          </div>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-around" values={['PC', 'Smartphone', 'Tablet']} />
          </div>
        </>
      ),
    },
    {
      title: 'Grid layout',
      children: (
        <>
          <div style={{ width: '16em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes gridColumnsCount={2} values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
          <div style={{ width: '16em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-between" gridColumnsCount={2} values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
          <div style={{ width: '16em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-evenly" gridColumnsCount={2} values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
          <div style={{ width: '16em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-around" gridColumnsCount={2} values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
        </>
      ),
    },
    {
      title: 'Gap',
      description: 'Note that flex gap is not supported on iOS versions earlier than 15.4.',
      children: (
        <>
          <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="vertical" gap="14px" values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
          <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes gridColumnsCount={2} gap="0.5em 2em" values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} disabled />
          <Checkboxes values={['Windows', 'macOS', 'Linux']} disabled={new Set(['macOS'])} />
        </>
      ),
    },
    {
      title: 'Error state',
      children: (
        <>
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} error="Something went wrong" />
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} error />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <Checkboxes values={['PC', 'Smartphone']} required />
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} required error="Required" />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <Checkboxes
            values={['Windows', 'macOS', 'Linux']}
            error={(selected) => selected.size !== 2 && 'Select two options.'}
          />
        </>
      ),
    },
    {
      title: 'Validate initial value',
      children: (
        <>
          <Checkboxes values={['PC', 'Smartphone']} required validateImmediately />
          <Checkboxes
            values={['Windows', 'macOS', 'Linux']}
            error={(selected) => selected.size !== 2 && 'Select two options.'}
            validateImmediately
          />
        </>
      ),
    },
  ],
}))
