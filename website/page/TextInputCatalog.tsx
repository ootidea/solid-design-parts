import { createRoot, createSignal } from 'solid-js'
import { Gravity, IconButton } from '../../src'
import { Button } from '../../src/Button'
import { Icon } from '../../src/Icon'
import { TextInput } from '../../src/TextInput'
import { Catalog } from './ComponentCatalogPage'
import microphoneIcon from './microphone.svg'
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
          <TextInput placeholder="Search..." prepend={<Icon src={searchIcon} style={{ 'margin-left': '0.5em' }} />} />
          <TextInput
            placeholder="Input by keyboard or voice"
            append={<IconButton src={microphoneIcon} style={{ 'margin-right': '0.5em' }} />}
          />
          <TextInput
            placeholder="your.domain"
            prepend={<Gravity style={{ padding: '0 0.5em', background: '#eee' }}>https://</Gravity>}
            append={<Gravity style={{ padding: '0 0.5em', background: '#eee' }}>.com</Gravity>}
          />
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
      title: 'Error state',
      children: (
        <>
          <TextInput placeholder="placeholder" error="Invalid value" />
          <TextInput value="default value" error="Error" />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <TextInput placeholder="Empty error message" required />
          <TextInput placeholder="placeholder" required error="Required" />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <TextInput placeholder="placeholder" error={(value) => value.length % 2 === 0} />
          <TextInput
            placeholder="verification code"
            error={(value) => !/[0-9]{5}/.test(value) && 'Please enter 5 digits'}
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
          <TextInput placeholder="placeholder" error={(value) => value.length % 2 === 0} validateImmediately />
          <TextInput
            placeholder="verification code"
            error={(value) => !/[0-9]{5}/.test(value) && 'Please enter 5 digits'}
            validateImmediately
          />
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
