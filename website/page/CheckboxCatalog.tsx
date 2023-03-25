import { createRoot, createSignal } from 'solid-js'
import { Checkbox } from '../../src/Checkbox'
import { Catalog } from './ComponentCatalogPage'

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
          <Checkbox error="Something went wrong">Auto-update</Checkbox>
          <Checkbox error="">Keep me signed in</Checkbox>
        </>
      ),
    },
    {
      title: 'Validation',
      children: (
        <>
          <Checkbox error={(checked) => !checked && 'This checkbox is required'}>
            I agree to the terms of service
          </Checkbox>
          <Checkbox error={(checked) => checked && 'Cannot be used with other options'}>Auto-update</Checkbox>
        </>
      ),
    },
    {
      title: 'Validate initial value',
      children: (
        <>
          <Checkbox error={(checked) => !checked && 'This checkbox is required'} validateImmediately>
            I agree to the terms of service
          </Checkbox>
          <Checkbox checked error={(checked) => checked && 'Cannot be used with other options'} validateImmediately>
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
          <Checkbox required error="Required under the new policy">
            Auto-update
          </Checkbox>
        </>
      ),
    },
    {
      title: 'Radius',
      children: (
        <>
          <Checkbox radius="0" checked>
            I agree to the terms of service
          </Checkbox>
          <Checkbox radius="999vh" checked>
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