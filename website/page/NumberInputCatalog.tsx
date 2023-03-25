import { createRoot, createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { NumberInput } from '../../src/NumberInput'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal(0)

export const NumberInputCatalog: Catalog = createRoot(() => ({
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
          <NumberInput placeholder="placeholder" error="Invalid value" />
          <NumberInput value={1999} error="Error" />
        </>
      ),
    },
    {
      title: 'Validation',
      children: (
        <>
          <NumberInput
            placeholder="placeholder"
            error={(value) => {
              if (value === undefined) return 'Required'

              return
            }}
          />
          <NumberInput
            value={100}
            error={(value) => {
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
            error={(value) => {
              if (value === undefined) return 'Required'

              return
            }}
            validateImmediately
          />
          <NumberInput
            value={100}
            error={(value) => {
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
          <NumberInput placeholder="placeholder" required error="Required" />
          <NumberInput placeholder="placeholder" required error="Required" validateImmediately />
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
}))