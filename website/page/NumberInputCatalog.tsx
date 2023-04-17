import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Button, NumberInput } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const value = createSignalObject(0)

export const NumberInputCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>NumberInput</code> is a component used to input a numerical value in text format. It can be easily bound
      with a signal of number type. Unlike <code>&lt;input type=&#039;number&#039;&gt;</code>, the text is not changed
      during text editing.
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
      title: (
        <>
          Binding <code>value</code> to signal
        </>
      ),
      children: (
        <>
          <NumberInput value={value.value} onChangeValue={value.set} />
          <div>value: {String(value.value)}</div>
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
      title: 'Minimum and maximum value',
      children: (
        <>
          <NumberInput placeholder="consumption point" min={1} />
          <NumberInput placeholder="percent" min={0} max={100} error="Please enter a number between 0 and 100." />
        </>
      ),
    },
    {
      title: 'Integer only',
      children: (
        <>
          <NumberInput placeholder="number of days" integerOnly />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <NumberInput placeholder="placeholder" error={(value) => value === undefined && 'Required'} />
          <NumberInput
            value={15}
            error={(value) => {
              if (value === undefined) return 'Required'
              if (value % 10 !== 0) return 'Please enter a number in increments of 10.'

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
            value={15}
            error={(value) => {
              if (value === undefined) return 'Required'
              if (value % 10 !== 0) return 'Please enter a number in increments of 10.'

              return false
            }}
            validateImmediately
          />
        </>
      ),
    },
    {
      title: 'Showing the clear button',
      children: (
        <>
          <NumberInput value={3.14159} showClearButton />
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
          <NumberInput value={-3.14159} radius="0" />
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
