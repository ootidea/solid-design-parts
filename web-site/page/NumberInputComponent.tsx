import { createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { NumberInput } from '../../src/NumberInput'
import { Catalog } from './ComponentCatalog'

const [value, setValue] = createSignal(0)

export const NumberInputCatalog: Catalog = {
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <NumberInput />
          <NumberInput placeholder="placeholder" />
          <NumberInput value={0.1} />
        </>
      ),
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <NumberInput value={value()} onChangeValue={setValue} />
          <div>value: {String(value())}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <NumberInput placeholder="placeholder" disabled />
          <NumberInput value={-50} disabled />
        </>
      ),
    },
    {
      title: 'Error message',
      children: (
        <>
          <NumberInput placeholder="placeholder" errorMessage="Invalid value" />
          <NumberInput value={1999} errorMessage="Error" />
        </>
      ),
    },
    {
      title: 'Validation',
      children: (
        <>
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
        </>
      ),
    },
    {
      title: 'Validate initial value',
      description: 'If validateImmediately option is set, it perform validation even if the user did not edit it.',
      children: (
        <>
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
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <NumberInput placeholder="placeholder" required errorMessage="Required" />
          <NumberInput placeholder="placeholder" required errorMessage="Required" validateImmediately />
          <NumberInput placeholder="Empty error message" required />
        </>
      ),
    },
    {
      title: 'Radius',
      children: (
        <>
          <NumberInput value={3.14159} radius="0" />
          <NumberInput placeholder="placeholder" radius="9999px" />
        </>
      ),
    },
    {
      title: 'With action button',
      children: (
        <>
          <div style={{ display: 'grid', 'grid-template-columns': '1fr auto' }}>
            <NumberInput placeholder="Number of slots" radius="1em 0 0 1em" />
            <Button radius="0 1em 1em 0">Apply</Button>
          </div>
        </>
      ),
    },
  ],
}
