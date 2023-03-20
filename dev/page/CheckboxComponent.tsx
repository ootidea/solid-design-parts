import { createSignal } from 'solid-js'
import { Checkbox } from '../../src/Checkbox'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function CheckboxComponent() {
  const [checked, setChecked] = createSignal(true)

  return (
    <article>
      <PageTitle>Checkbox</PageTitle>

      <Sample title="Basic example">
        <Checkbox checked>Remember my choice</Checkbox>
        <Checkbox>I agree to the terms of service</Checkbox>
      </Sample>

      <Sample title="Bind to signal">
        <Checkbox checked={checked()} onChangeChecked={setChecked}>
          Send me weekly summary
        </Checkbox>
        <div>checked: {String(checked())}</div>
      </Sample>

      <Sample title="Disabled">
        <Checkbox disabled>Keep me signed</Checkbox>
        <Checkbox checked disabled>
          Accept cookies
        </Checkbox>
      </Sample>

      <Sample title="Error message">
        <Checkbox errorMessage="Something went wrong">Auto-update</Checkbox>
        <Checkbox errorMessage="">Keep me signed in</Checkbox>
      </Sample>

      <Sample title="Validation">
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
      </Sample>

      <Sample title="Validate initial value">
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
      </Sample>

      <Sample title="Required">
        <Checkbox required validateImmediately>
          I agree to the terms of service
        </Checkbox>
        <Checkbox required errorMessage="Required under the new policy">
          Auto-update
        </Checkbox>
      </Sample>

      <Sample title="Size">
        <Checkbox style="font-size: 14px" checked>
          14px
        </Checkbox>
        <Checkbox style="font-size: 16px" checked>
          16px
        </Checkbox>
        <Checkbox style="font-size: 18px" checked>
          18px
        </Checkbox>
      </Sample>
    </article>
  )
}
