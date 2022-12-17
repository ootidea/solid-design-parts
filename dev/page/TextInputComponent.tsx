import { createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { Icon } from '../../src/Icon'
import { Spinner } from '../../src/Spinner'
import { TextInput } from '../../src/TextInput'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import alertOutlineIcon from './alert-outline.svg'
import checkIcon from './check.svg'
import searchIcon from './search.svg'

export function TextInputComponent() {
  const [value, setValue] = createSignal('default value')

  return (
    <article>
      <PageTitle>TextInput</PageTitle>

      <Sample title="Basic example">
        <TextInput />
      </Sample>

      <Sample title="Placeholder">
        <TextInput placeholder="placeholder" />
      </Sample>

      <Sample title="Default value">
        <TextInput value="default value" />
      </Sample>

      <Sample title="Bind to signal">
        <TextInput value={value()} onChangeValue={setValue} />
        <div>value() === '{value()}'</div>
      </Sample>

      <Sample title="Types">
        <TextInput type="tel" placeholder="tel" />
        <TextInput type="email" placeholder="email" />
        <TextInput type="password" placeholder="password" />
        <TextInput type="number" placeholder="number" />
      </Sample>

      <Sample title="Append and prepend">
        <TextInput value="valid text" append={<Icon src={checkIcon} />} />
        <TextInput placeholder="security number" prepend={<Icon src={alertOutlineIcon} />} />
        <TextInput placeholder="Search" append={<Spinner />} />
      </Sample>

      <Sample title="Disabled">
        <TextInput placeholder="placeholder" disabled />
        <TextInput value="default value" disabled />
      </Sample>

      <Sample title="Error message">
        <TextInput placeholder="placeholder" errorMessage="Invalid value" />
        <TextInput value="default value" errorMessage="Error" />
      </Sample>

      <Sample title="Validation">
        <TextInput
          placeholder="placeholder"
          errorMessage={(value) => {
            if (value.length === 0) return 'Required'
            return undefined
          }}
        />
        <TextInput
          value="Default value"
          errorMessage={(value) => {
            if (value.toLowerCase() !== value) return 'Uppercase letters are not allowed.'
            return undefined
          }}
        />
      </Sample>

      <Sample
        title="Force validation"
        description="If forceValidation option is set, it perform validation even if the user did not edit it."
      >
        <TextInput
          placeholder="placeholder"
          forceValidation
          errorMessage={(value) => {
            if (value.length === 0) return 'Required'
            return undefined
          }}
        />
        <TextInput
          value="Default value"
          forceValidation
          errorMessage={(value) => {
            if (value.toLowerCase() !== value) return 'Uppercase letters are not allowed.'
            return undefined
          }}
        />
      </Sample>

      <Sample title="Radius">
        <TextInput value="default value" radius="0" />
        <TextInput placeholder="placeholder" radius="9999px" />
      </Sample>

      <Sample title="With action button">
        <div style={{ display: 'grid', 'grid-template-columns': '1fr auto' }}>
          <TextInput radius="1em 0 0 1em" />
          <Button radius="0 1em 1em 0">Send</Button>
        </div>
        <div style={{ display: 'grid', 'grid-template-columns': 'auto 1fr' }}>
          <Button
            radius="var(--skel-input-border-radius) 0 0 var(--skel-input-border-radius)"
            style={{ padding: '0 0.4em' }}
          >
            <Icon src={searchIcon} color="currentColor" size="1.7em" />
          </Button>
          <TextInput radius="0 var(--skel-input-border-radius) var(--skel-input-border-radius) 0" />
        </div>
      </Sample>
    </article>
  )
}
