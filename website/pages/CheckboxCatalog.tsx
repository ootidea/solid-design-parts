import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Checkbox } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const checked = createSignalObject(true)

export const CheckboxCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <Checkbox checked>Remember my choice</Checkbox>
          <Checkbox>I agree to the terms of service</Checkbox>
        </>
      ),
    },
    {
      title: {
        default: (
          <>
            Binding <code>checked</code> to a signal
          </>
        ),
        ja: (
          <>
            <code>checked</code>とsignalの双方向バインディング
          </>
        ),
      },
      children: (
        <>
          <Checkbox checked={checked.value} onChangeChecked={checked.set}>
            Send me weekly summary
          </Checkbox>
          <div>checked: {String(checked.value)}</div>
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
      title: 'Error state',
      children: (
        <>
          <Checkbox error="Something went wrong.">Auto-update</Checkbox>
          <Checkbox error>Keep me signed in</Checkbox>
        </>
      ),
    },
    {
      title: 'Required',
      description: (
        <>
          Using <code>required</code> makes checking the box mandatory.
        </>
      ),
      children: (
        <>
          <Checkbox required>I agree to the terms of service</Checkbox>
          <Checkbox required error="Required under the new policy.">
            Auto-update
          </Checkbox>
        </>
      ),
    },
    {
      title: { default: 'Validation function', ja: 'バリデーション関数を指定' },
      children: (
        <>
          <Checkbox error={(checked) => !checked && 'This checkbox is required.'}>
            I agree to the terms of service
          </Checkbox>
          <Checkbox error={(checked) => checked && 'Cannot be used with other options.'}>Auto-update</Checkbox>
        </>
      ),
    },
    {
      title: { default: 'Validate initial value', ja: '初期値をバリデート' },
      children: (
        <>
          <Checkbox error={(checked) => !checked && 'This checkbox is required.'} validateImmediately>
            I agree to the terms of service
          </Checkbox>
          <Checkbox checked error={(checked) => checked && 'Cannot be used with other options.'} validateImmediately>
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
