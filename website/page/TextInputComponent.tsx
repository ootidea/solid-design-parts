import { createRoot, createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { Icon } from '../../src/Icon'
import { Spinner } from '../../src/Spinner'
import { TextInput } from '../../src/TextInput'
import alertOutlineIcon from './alert-outline.svg'
import checkIcon from './check.svg'
import { Catalog } from './ComponentCatalog'
import searchIcon from './search.svg'

const [value, setValue] = createSignal('default value')

export const TextInputCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <TextInput />
          <TextInput placeholder="placeholder" />
          <TextInput value="default value" />
        </>
      ),
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <TextInput value={value()} onChangeValue={setValue} />
          <div style={{ 'white-space': 'pre-wrap' }}>value: {JSON.stringify(value())}</div>
        </>
      ),
    },
    {
      title: 'Types',
      children: (
        <>
          <TextInput type="tel" placeholder="tel" />
          <TextInput type="email" placeholder="email" />
          <TextInput type="password" placeholder="password" />
          <TextInput type="number" placeholder="number" />
        </>
      ),
    },
    {
      title: 'Append and prepend',
      children: (
        <>
          <TextInput value="valid text" append={<Icon src={checkIcon} />} />
          <TextInput placeholder="security number" prepend={<Icon src={alertOutlineIcon} />} />
          <TextInput placeholder="Search" append={<Spinner />} />
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <TextInput placeholder="placeholder" disabled />
          <TextInput value="default value" disabled />
        </>
      ),
    },
    {
      title: 'Error message',
      children: (
        <>
          <TextInput placeholder="placeholder" errorMessage="Invalid value" />
          <TextInput value="default value" errorMessage="Error" />
        </>
      ),
    },
    {
      title: 'Validation',
      children: (
        <>
          <TextInput
            placeholder="placeholder"
            errorMessage={(value) => {
              if (value.length === 0) return 'Required'

              return
            }}
          />
          <TextInput
            value="Default value"
            errorMessage={(value) => {
              if (value.toLowerCase() !== value) return 'Uppercase letters are not allowed.'

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
          <TextInput
            placeholder="placeholder"
            validateImmediately
            errorMessage={(value) => {
              if (value.length === 0) return 'Required'

              return
            }}
          />
          <TextInput
            value="Default value"
            validateImmediately
            errorMessage={(value) => {
              if (value.toLowerCase() !== value) return 'Uppercase letters are not allowed.'

              return
            }}
          />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <TextInput placeholder="placeholder" required errorMessage="Required" />
          <TextInput placeholder="placeholder" required errorMessage="Required" validateImmediately />
          <TextInput placeholder="Empty error message" required />
        </>
      ),
    },
    {
      title: 'Radius',
      children: (
        <>
          <TextInput value="default value" radius="0" />
          <TextInput placeholder="placeholder" radius="9999px" />
        </>
      ),
    },
    {
      title: 'With action button',
      children: (
        <>
          <div style={{ display: 'grid', 'grid-template-columns': '1fr auto' }}>
            <TextInput radius="1em 0 0 1em" />
            <Button radius="0 1em 1em 0">Send</Button>
          </div>
          <div style={{ display: 'grid', 'grid-template-columns': 'auto 1fr' }}>
            <Button
              radius="var(--solid-design-parts-input-border-radius) 0 0 var(--solid-design-parts-input-border-radius)"
              style={{ padding: '0 0.4em' }}
            >
              <Icon src={searchIcon} color="currentColor" size="1.7em" />
            </Button>
            <TextInput radius="0 var(--solid-design-parts-input-border-radius) var(--solid-design-parts-input-border-radius) 0" />
          </div>
        </>
      ),
    },
  ],
}))
