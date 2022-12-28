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

      <Sample title="Basic example">
        <RadioButtons name="animal" values={['Dog', 'Cat']} />
      </Sample>

      <Sample
        title="Omit name attribute"
        description="Automatically generates a unique name if the attribute is omitted."
      >
        <RadioButtons values={['left', 'center', 'right']} />
      </Sample>

      <Sample title="Default selected">
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

      <Sample title="Disabled">
        <RadioButtons values={['left', 'center', 'right']} selected="right" disabled />
      </Sample>

      <Sample title="Disabled item">
        <RadioButtons values={['left', 'center', 'right']} disabled={new Set(['center'])} />
      </Sample>

      <Sample title="Enable deselection">
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

      <Sample title="Gap" description="Note that flex gap is not supported on iOS versions earlier than 15.4.">
        <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
          <RadioButtons layout="vertical" gap="20px" values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
        </div>
        <div style={{ width: '50em', border: '1px dashed gray', padding: '1em' }}>
          <RadioButtons gridColumnsCount={2} gap="0.5em 2em" values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
        </div>
      </Sample>

      <Sample title="Error message">
        <RadioButtons values={['left', 'center', 'right']} selected="left" errorMessage="Invalid" />
      </Sample>

      <Sample title="Validation">
        <RadioButtons
          values={['left', 'center', 'right']}
          errorMessage={(selected) => {
            if (selected === 'center') return 'Currently, center is not available.'

            return
          }}
        />
      </Sample>

      <Sample
        title="Validate initial value"
        description="If validateInitialValue option is set, it perform validation even if the user did not edit it."
      >
        <RadioButtons
          values={['left', 'center', 'right']}
          errorMessage={(selected) => {
            if (selected !== 'center') return 'Must be center'

            return
          }}
          validateInitialValue
        />
      </Sample>
    </article>
  )
}
