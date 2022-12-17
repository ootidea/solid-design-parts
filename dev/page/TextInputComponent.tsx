import { createSignal } from 'solid-js'
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

      <Sample title="Buttons">
        <TextInput tailButtonContent="Send" />
        <TextInput headButtonContent={<Icon src={searchIcon} color="currentColor" size="1.7em" />} />
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
    </article>
  )
}
