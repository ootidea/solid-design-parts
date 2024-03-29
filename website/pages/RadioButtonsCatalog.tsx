import { createRoot, createSignal } from 'solid-js'
import { RadioButtons } from '../../library'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'

const [selected, setSelected] = createSignal<'Python' | 'TypeScript' | 'Kotlin' | 'Swift' | undefined>(undefined)

export const RadioButtonsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <RadioButtons values={['Dog', 'Cat']} />
          <RadioButtons values={['left', 'center', 'right']} selected="left" />
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
          <RadioButtons
            values={['Python', 'TypeScript', 'Kotlin', 'Swift']}
            selected={selected()}
            onChangeSelected={setSelected}
          />
          <div>selected: {toLiteral(selected())}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <RadioButtons values={['left', 'center', 'right']} selected="right" disabled />
          <RadioButtons values={['left', 'center', 'right']} disabledValues={new Set(['center'])} />
        </>
      ),
    },
    {
      title: 'Layout',
      children: (
        <>
          <div style={{ border: '1px dashed gray', padding: '1em' }}>
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
          <div style={{ border: '1px dashed gray', padding: '1em' }}>
            <RadioButtons layout="vertical" gap="14px" values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
          </div>
          <div style={{ border: '1px dashed gray', padding: '1em' }}>
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
      title: { default: 'Validation function', ja: 'バリデーション関数を指定' },
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
      title: { default: 'Validate initial value', ja: '初期値をバリデート' },
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
          <RadioButtons values={['left', 'center', 'right']} enableDeselection selected="left" />
        </>
      ),
    },
  ],
}))
