import { createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { NumberInput } from '../../src/NumberInput'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function NumberInputComponent() {
  const [value, setValue] = createSignal(0)

  return (
    <article>
      <PageTitle>NumberInput</PageTitle>

      <Sample title="Basic example">
        <NumberInput />
        <NumberInput placeholder="placeholder" />
        <NumberInput value={0.1} />
      </Sample>

      <Sample title="Bind to signal">
        <NumberInput value={value()} onChangeValue={setValue} />
        <div>value: {String(value())}</div>
      </Sample>

      <Sample title="Disabled">
        <NumberInput placeholder="placeholder" disabled />
        <NumberInput value={-50} disabled />
      </Sample>

      <Sample title="Error message">
        <NumberInput placeholder="placeholder" errorMessage="Invalid value" />
        <NumberInput value={1999} errorMessage="Error" />
      </Sample>

      <Sample title="Validation">
        <NumberInput
          placeholder="placeholder"
          errorMessage={(value) => {
            if (value === undefined) return 'Required'

            return
          }}
        />
        <NumberInput
          value={100}
          errorMessage={(value) => {
            if (value === undefined) return 'Required'
            if (value < 0) return 'Please enter a non-negative number'

            return
          }}
        />
      </Sample>

      <Sample
        title="Validate initial value"
        description="If validateImmediately option is set, it perform validation even if the user did not edit it."
      >
        <NumberInput
          placeholder="placeholder"
          errorMessage={(value) => {
            if (value === undefined) return 'Required'

            return
          }}
          validateImmediately
        />
        <NumberInput
          value={100}
          errorMessage={(value) => {
            if (value === undefined) return 'Required'
            if (value < 0) return 'Please enter a non-negative number'

            return
          }}
          validateImmediately
        />
      </Sample>

      <Sample title="Required">
        <NumberInput placeholder="placeholder" required errorMessage="Required" />
        <NumberInput placeholder="placeholder" required errorMessage="Required" validateImmediately />
        <NumberInput placeholder="Empty error message" required />
      </Sample>

      <Sample title="Radius">
        <NumberInput value={3.14159} radius="0" />
        <NumberInput placeholder="placeholder" radius="9999px" />
      </Sample>

      <Sample title="With action button">
        <div style={{ display: 'grid', 'grid-template-columns': '1fr auto' }}>
          <NumberInput placeholder="Number of slots" radius="1em 0 0 1em" />
          <Button radius="0 1em 1em 0">Apply</Button>
        </div>
      </Sample>
    </article>
  )
}
