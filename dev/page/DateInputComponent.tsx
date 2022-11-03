import { createSignal } from 'solid-js'
import { DateInput } from '../../src/DateInput'
import { toLiteral } from '../other'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function DateInputComponent() {
  const [value, setValue] = createSignal(new Date())

  return (
    <article>
      <PageTitle>DateInput</PageTitle>

      <Sample title="Basic example" direction="horizontal">
        <DateInput />
      </Sample>

      <Sample title="Placeholder" direction="horizontal">
        <DateInput placeholder="placeholder" />
        <DateInput placeholder="a little long placeholder" />
      </Sample>

      <Sample title="Default value" direction="horizontal">
        <DateInput value={new Date()} />
      </Sample>

      <Sample title="Bind to signal">
        <DateInput value={value()} onChangeValue={setValue} />
        <div>value()?.toLocaleDateString() === {toLiteral(value()?.toLocaleDateString())}</div>
      </Sample>

      <Sample title="Disabled" direction="horizontal">
        <DateInput placeholder="placeholder" disabled />
        <DateInput value={new Date()} disabled />
      </Sample>

      <Sample title="Disable by date" direction="horizontal">
        <DateInput disabled={(date) => date.getTime() < Date.now()} />
      </Sample>

      <Sample title="Change date format" direction="horizontal">
        <DateInput format={({ value }) => value?.toISOString()} />
      </Sample>
    </article>
  )
}
