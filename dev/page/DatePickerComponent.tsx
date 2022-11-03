import { createSignal } from 'solid-js'
import { DatePicker } from '../../src/DatePicker'
import { toLiteral } from '../other'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function DatePickerComponent() {
  const [value, setValue] = createSignal<Date | undefined>(undefined)

  return (
    <article>
      <PageTitle>DatePicker</PageTitle>

      <Sample title="Basic example">
        <DatePicker />
      </Sample>

      <Sample title="Specify default month">
        <DatePicker month={new Date(1999, 0)} />
      </Sample>

      <Sample title="Specify default selected date">
        <DatePicker value={new Date()} />
      </Sample>

      <Sample title="Bind to signal">
        <DatePicker value={value()} onChangeValue={setValue} />
        <div>value()?.toLocaleDateString() === {toLiteral(value()?.toLocaleDateString())}</div>
      </Sample>

      <Sample title="Disabled">
        <DatePicker disabled={(date) => date.getTime() < Date.now()} />
      </Sample>
    </article>
  )
}
