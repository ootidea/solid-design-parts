import { createSignal } from 'solid-js'
import { RadioButtons } from '../../src/RadioButtons'
import { toLiteral } from '../other'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function RadioButtonsComponent() {
  const [selected, setSelected] = createSignal<'Python' | 'TypeScript' | 'Kotlin' | 'Swift' | undefined>(undefined)

  return (
    <article>
      <PageTitle>RadioButtons</PageTitle>

      <Sample title="Basic example" direction="horizontal">
        <RadioButtons name="animal" values={['Dog', 'Cat']} />
      </Sample>

      <Sample
        title="Omit name attribute"
        description="Automatically generates a unique name if the attribute is omitted."
        direction="horizontal"
      >
        <RadioButtons values={['left', 'center', 'right']} />
      </Sample>

      <Sample title="Default selected" direction="horizontal">
        <RadioButtons values={['left', 'center', 'right']} selected="left" />
      </Sample>

      <Sample title="Bind to signal">
        <div style="display: grid; grid-template-columns: auto auto; gap: 1em; width: max-content;">
          <RadioButtons
            values={['Python', 'TypeScript', 'Kotlin', 'Swift']}
            selected={selected()}
            onChangeSelected={setSelected}
          />
        </div>
        <div>selected() === {toLiteral(selected())}</div>
      </Sample>

      <Sample title="Disabled" direction="horizontal">
        <RadioButtons values={['left', 'center', 'right']} selected="right" disabled />
      </Sample>

      <Sample title="Disabled item" direction="horizontal">
        <RadioButtons values={['left', 'center', 'right']} disabled={new Set(['center'])} />
      </Sample>

      <Sample title="Enable deselection" direction="horizontal" description="">
        <RadioButtons values={['left', 'center', 'right']} enableDeselection />
      </Sample>

      <Sample title="Layout">
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
          <RadioButtons layout="space-between" values={['left', 'middle', 'right']} />
        </div>
        <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
          <RadioButtons layout="space-evenly" values={['left', 'middle', 'right']} />
        </div>
        <div style={{ width: '20em', border: '1px dashed gray', padding: '1em' }}>
          <RadioButtons layout="space-around" values={['left', 'middle', 'right']} />
        </div>
      </Sample>

      <Sample title="Grid layout">
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
          <RadioButtons layout="space-around" gridColumnsCount={2} values={['left', 'middle', 'right']} />
        </div>
      </Sample>

      <Sample title="Gap">
        <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
          <RadioButtons layout="vertical" gap="10px" values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
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
      </Sample>
    </article>
  )
}
