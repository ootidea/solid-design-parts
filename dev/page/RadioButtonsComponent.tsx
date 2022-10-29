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

      <Sample id="basic-example" title="Basic example" direction="horizontal">
        <RadioButtons name="animal" values={['Dog', 'Cat']} />
      </Sample>

      <Sample
        id="omit-name-attribute"
        title="Omit name attribute"
        description="Automatically generates a unique name if the attribute is omitted."
        direction="horizontal"
      >
        <RadioButtons values={['left', 'center', 'right']} />
      </Sample>

      <Sample id="grid-layout" title="Grid layout">
        <div style="display: grid; grid-template-columns: auto auto; gap: 1em; width: max-content;">
          <RadioButtons values={['Python', 'TypeScript', 'Kotlin', 'Swift']} />
        </div>
      </Sample>

      <Sample id="default-selected" title="Default selected" direction="horizontal">
        <RadioButtons values={['left', 'center', 'right']} selected="left" />
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <div style="display: grid; grid-template-columns: auto auto; gap: 1em; width: max-content;">
          <RadioButtons
            values={['Python', 'TypeScript', 'Kotlin', 'Swift']}
            selected={selected()}
            onChangeSelected={setSelected}
          />
        </div>
        <div>selected() === {toLiteral(selected())}</div>
      </Sample>

      <Sample id="disabled" title="Disabled" direction="horizontal">
        <RadioButtons values={['left', 'center', 'right']} selected="right" disabled />
      </Sample>

      <Sample id="enable-deselection" title="Enable deselection" direction="horizontal" description="">
        <RadioButtons values={['left', 'center', 'right']} enableDeselection />
      </Sample>
    </article>
  )
}
