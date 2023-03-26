import { createRoot, createSignal } from 'solid-js'
import { RadioButtons } from '../../src/RadioButtons'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'

const [selected, setSelected] = createSignal<'Python' | 'TypeScript' | 'Kotlin' | 'Swift' | undefined>(undefined)

export const RadioButtonsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <RadioButtons values={['Dog', 'Cat']} />
          <RadioButtons values={['left', 'center', 'right']} selected="left" />
        </>
      ),
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <div style="display: grid; grid-template-columns: auto auto; gap: 1em; width: max-content;">
            <RadioButtons
              values={['Python', 'TypeScript', 'Kotlin', 'Swift']}
              selected={selected()}
              onChangeSelected={setSelected}
            />
          </div>
          <div>selected: {toLiteral(selected())}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <RadioButtons values={['left', 'center', 'right']} selected="right" disabled />
          <RadioButtons values={['left', 'center', 'right']} disabled={new Set(['center'])} />
        </>
      ),
    },
    {
      title: 'Layout',
      children: (
        <>
          <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons layout="vertical" values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
          </div>
          <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons
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
            <RadioButtons layout="space-between" values={['left', 'center', 'right']} />
          </div>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons layout="space-evenly" values={['left', 'center', 'right']} />
          </div>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons layout="space-around" values={['left', 'center', 'right']} />
          </div>
        </>
      ),
    },
    {
      title: 'Grid layout',
      children: (
        <>
          <div style={{ width: '16em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons gridColumnsCount={2} values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
          </div>
          <div style={{ width: '16em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons
              layout="space-between"
              gridColumnsCount={2}
              values={['Python', 'TypeScript', 'Kotlin', 'Swift']}
            />
          </div>
          <div style={{ width: '16em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons
              layout="space-evenly"
              gridColumnsCount={2}
              values={['Python', 'TypeScript', 'Kotlin', 'Swift']}
            />
          </div>
          <div style={{ width: '16em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons
              layout="space-around"
              gridColumnsCount={2}
              values={['Python', 'TypeScript', 'Kotlin', 'Swift']}
            />
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
            <RadioButtons layout="vertical" gap="14px" values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
          </div>
          <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons gridColumnsCount={2} gap="0.5em 2em" values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
          </div>
        </>
      ),
    },
    {
      title: 'Error state',
      children: (
        <>
          <RadioButtons values={['left', 'center', 'right']} selected="left" error="Invalid" />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <RadioButtons values={['left', 'center', 'right']} required enableDeselection />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <RadioButtons
            values={['left', 'center', 'right']}
            error={(selected) => selected === 'center' && 'Currently, center is not available.'}
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
          <RadioButtons
            values={['left', 'center', 'right']}
            error={(selected) => selected !== 'center' && 'Must be center'}
            validateImmediately
          />
        </>
      ),
    },
    {
      title: 'Enable deselection',
      description: (
        <>
          If the <code>enableDeselection</code> option is set, clicking the selected option again will deselect it.
        </>
      ),
      children: (
        <>
          <RadioButtons values={['left', 'center', 'right']} enableDeselection />
        </>
      ),
    },
  ],
}))
