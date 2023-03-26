import { createRoot, createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { NumberInput } from '../../src/NumberInput'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal(0)

export const NumberInputCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>NumberInput</code> is a component used to input numerical values in text format. It can be easily bound with
      a signal of number type. Unlike <code>&lt;input type=&#039;number&#039;&gt;</code>, the text is not changed during
      text editing.
    </>
  ),
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
      title: 'Error state',
      children: (
        <>
          <NumberInput placeholder="placeholder" error="Invalid value" />
          <NumberInput value={1999} error="Error" />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <NumberInput placeholder="placeholder" required error="Required" />
          <NumberInput placeholder="Empty error message" required />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <NumberInput placeholder="placeholder" error={(value) => value === undefined && 'Required'} />
          <NumberInput
            value={100}
            error={(value) => {
              if (value === undefined) return 'Required'
              if (value < 0) return 'Please enter a non-negative number'

              return false
            }}
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
          <NumberInput
            placeholder="placeholder"
            error={(value) => value === undefined && 'Required'}
            validateImmediately
          />
          <NumberInput
            value={100}
            error={(value) => {
              if (value === undefined) return 'Required'
              if (value < 0) return 'Please enter a non-negative number'

              return false
            }}
            validateImmediately
          />
        </>
      ),
    },
    {
      title: 'Prefix and suffix',
      children: (
        <>
          <NumberInput placeholder="transfer amount" prefix={<div style={{ 'margin-left': '0.5em' }}>$</div>} />
          <NumberInput value={100} suffix={<div style={{ 'margin-right': '0.5em' }}>%</div>} />
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
