import { createSignal } from 'solid-js'
import { Checkboxes } from '../../src/Checkboxes'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function CheckboxesComponent() {
  const [selected, setSelected] = createSignal(new Set(['PC']), { equals: false })

  return (
    <article>
      <PageTitle>Checkboxes</PageTitle>

      <Sample title="Basic sample">
        <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} />
        <Checkboxes values={['dog', 'cat']} titles={{ dog: '🐶Dog', cat: '😺Cat' }} />
      </Sample>

      <Sample title="Bind to signal">
        <Checkboxes values={['PC', 'Smartphone', 'Tablet']} selected={selected()} onChangeSelected={setSelected} />
        <div>{`selected: {${[...selected()].map((value) => JSON.stringify(value)).join(', ')}}`}</div>
      </Sample>

      <Sample title="Layout">
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
      </Sample>

      <Sample title="Grid layout">
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
      </Sample>

      <Sample title="Gap" description="Note that flex gap is not supported on iOS versions earlier than 15.4.">
        <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
          <Checkboxes layout="vertical" gap="14px" values={['Walking', 'Bicycle', 'Car', 'Train']} />
        </div>
        <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
          <Checkboxes gridColumnsCount={2} gap="0.5em 2em" values={['Walking', 'Bicycle', 'Car', 'Train']} />
        </div>
      </Sample>

      <Sample title="Disabled">
        <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} disabled />
        <Checkboxes values={['Windows', 'macOS', 'Linux']} disabled={new Set(['macOS'])} />
      </Sample>

      <Sample title="Error message">
        <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} errorMessage="Something went wrong" />
        <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} errorMessage="" />
      </Sample>

      <Sample title="Required">
        <Checkboxes values={['PC', 'Smartphone']} required />
        <Checkboxes values={['PC', 'Smartphone']} selected={new Set(['PC'])} required errorMessage="Required" />
      </Sample>

      <Sample title="Validation function">
        <Checkboxes
          values={['Windows', 'macOS', 'Linux']}
          errorMessage={(selected) => {
            if (selected.size === 2) return
            return 'Select two options.'
          }}
        />
      </Sample>

      <Sample title="Validate initial value">
        <Checkboxes values={['PC', 'Smartphone']} required validateImmediately />
        <Checkboxes
          values={['Windows', 'macOS', 'Linux']}
          errorMessage={(selected) => {
            if (selected.size === 2) return
            return 'Select two options.'
          }}
          validateImmediately
        />
      </Sample>
    </article>
  )
}
