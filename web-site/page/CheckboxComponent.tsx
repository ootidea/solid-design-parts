import { createRoot, createSignal } from 'solid-js'
import { Checkbox } from '../../src/Checkbox'
import { Catalog } from './ComponentCatalog'

const [checked, setChecked] = createSignal(true)

export const CheckboxCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Checkbox checked>Remember my choice</Checkbox>
          <Checkbox>I agree to the terms of service</Checkbox>
        </>
      ),
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <Checkbox checked={checked()} onChangeChecked={setChecked}>
            Send me weekly summary
          </Checkbox>
          <div>checked: {String(checked())}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <Checkbox disabled>Keep me signed</Checkbox>
          <Checkbox checked disabled>
            Accept cookies
          </Checkbox>
        </>
      ),
    },
    {
      title: 'Error message',
      children: (
        <>
          <Checkbox errorMessage="Something went wrong">Auto-update</Checkbox>
          <Checkbox errorMessage="">Keep me signed in</Checkbox>
        </>
      ),
    },
    {
      title: 'Validation',
      children: (
        <>
          <Checkbox
            errorMessage={(checked) => {
              if (checked) return

              return 'This checkbox is required'
            }}
          >
            I agree to the terms of service
          </Checkbox>
          <Checkbox errorMessage={(checked) => (checked ? 'Cannot be used with other options' : undefined)}>
            Auto-update
          </Checkbox>
        </>
      ),
    },
    {
      title: 'Validate initial value',
      children: (
        <>
          <Checkbox
            errorMessage={(checked) => {
              if (checked) return

              return 'This checkbox is required'
            }}
            validateImmediately
          >
            I agree to the terms of service
          </Checkbox>
          <Checkbox
            checked
            errorMessage={(checked) => (checked ? 'Cannot be used with other options' : undefined)}
            validateImmediately
          >
            Auto-update
          </Checkbox>
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <Checkbox required validateImmediately>
            I agree to the terms of service
          </Checkbox>
          <Checkbox required errorMessage="Required under the new policy">
            Auto-update
          </Checkbox>
        </>
      ),
    },
    {
      title: 'Size',
      children: (
        <>
          <Checkbox style="font-size: 14px" checked>
            14px
          </Checkbox>
          <Checkbox style="font-size: 16px" checked>
            16px
          </Checkbox>
          <Checkbox style="font-size: 18px" checked>
            18px
          </Checkbox>
        </>
      ),
    },
  ],
}))
