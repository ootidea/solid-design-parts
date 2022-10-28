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

      <Sample id="basic-example" title="Basic example">
        <TextInput />
      </Sample>

      <Sample id="placeholder" title="Placeholder">
        <TextInput placeholder="placeholder" />
      </Sample>

      <Sample id="default-value" title="Default value">
        <TextInput value="default value" />
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <TextInput value={value()} onChangeValue={setValue} />
        <div>value() === '{value()}'</div>
      </Sample>

      <Sample id="types" title="Types">
        <TextInput type="tel" placeholder="tel" />
        <TextInput type="email" placeholder="email" />
        <TextInput type="password" placeholder="password" />
      </Sample>

      <Sample id="append-and-prepend" title="Append and prepend">
        <TextInput value="valid text" append={<Icon src={checkIcon} />} />
        <TextInput placeholder="security number" prepend={<Icon src={alertOutlineIcon} />} />
        <TextInput placeholder="Search" append={<Spinner />} />
      </Sample>

      <Sample id="prefix-and-postfix" title="Prefix and postfix">
        <TextInput placeholder="www.example" prefix="http://" postfix=".com" />
        <TextInput placeholder="Search" postfix={<Icon src={searchIcon} />} />
      </Sample>

      <Sample id="disabled" title="Disabled">
        <TextInput placeholder="placeholder" disabled />
        <TextInput value="default value" disabled />
      </Sample>
    </article>
  )
}
