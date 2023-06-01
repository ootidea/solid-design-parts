import { setOf } from 'base-up'
import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Checkboxes } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const selected = createSignalObject(setOf('PC'))

export const CheckboxesCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Checkboxes</code> is a component that displays a group of checkboxes. The state of the input field is
      treated as a single <code>Set</code> object, not as multiple boolean values.
    </>
  ),
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} />
          <Checkboxes values={['dog', 'cat', 'rabbit']} labels={{ dog: 'Dog🐶', cat: 'Cat😺', rabbit: 'Rabbit🐰' }} />
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
      title: { default: 'Layout', ja: 'レイアウト' },
      children: (
        <>
          <div style={{ border: '1px dashed gray', padding: '1em' }}>
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
          <div style={{ width: '28em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-between" values={['PC', 'Smartphone', 'Tablet']} />
          </div>
          <div style={{ width: '28em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-evenly" values={['PC', 'Smartphone', 'Tablet']} />
          </div>
          <div style={{ width: '28em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-around" values={['PC', 'Smartphone', 'Tablet']} />
          </div>
        </>
      ),
    },
    {
      title: { default: 'Grid layout', ja: 'グリッドレイアウト' },
      children: (
        <>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes gridColumnsCount={2} values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-between" gridColumnsCount={2} values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-evenly" gridColumnsCount={2} values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
          <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="space-around" gridColumnsCount={2} values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
        </>
      ),
    },
    {
      title: { default: 'Gap between items', ja: '項目間のgap' },
      description: 'Note that flex gap is not supported on iOS versions earlier than 15.4.',
      children: (
        <>
          <div style={{ border: '1px dashed gray', padding: '1em' }}>
            <Checkboxes layout="vertical" gap="14px" values={['Walking', 'Bicycle', 'Car', 'Train']} />
          </div>
          <div style={{ border: '1px dashed gray', padding: '1em' }}>
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
          <Checkboxes values={['Windows', 'macOS', 'Linux']} disabledValues={new Set(['macOS'])} />
        </>
      ),
    },
    {
      title: 'Error state',
      children: (
        <>
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} error="Something went wrong." />
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} error />
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
          <Checkboxes values={['PC', 'Smartphone']} required />
          <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} required error="Required" />
        </>
      ),
    },
    {
      title: { default: 'Minimum and maximum selection count', ja: '選択項目数の最小値、最大値を設定' },
      children: (
        <>
          <Checkboxes values={['Windows', 'macOS', 'Linux']} min={2} error="Select two or more." />
          <Checkboxes values={['PC', 'Smartphone', 'Tablet', 'Smartwatch']} max={2} />
        </>
      ),
    },
    {
      title: { default: 'Validation function', ja: 'バリデーション関数を指定' },
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
      title: { default: 'Validate initial value', ja: '初期値をバリデート' },
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
