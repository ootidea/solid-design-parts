import { createSignal } from 'solid-js'
import { Select } from '../../src/Select'
import { toLiteral } from '../other'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function SelectComponent() {
  const [selected, setSelected] = createSignal<'Female' | 'Male' | 'Other' | undefined>('Female')

  return (
    <article>
      <PageTitle>Select</PageTitle>

      <Sample title="Basic example">
        <Select values={['Female', 'Male', 'Other']} />
        <Select values={['Female', 'Male', 'Other']} placeholder="placeholder" />
        <Select values={['Female', 'Male', 'Other']} selected="Male" />
      </Sample>

      <Sample title="Bind to signal">
        <Select values={['Female', 'Male', 'Other']} selected={selected()} onChangeSelected={setSelected} />
        <div>selected() === {toLiteral(selected())}</div>
      </Sample>

      <Sample title="Disabled">
        <Select values={['Female', 'Male', 'Other']} placeholder="placeholder" disabled />
        <Select values={['Female', 'Male', 'Other']} selected="Male" disabled />
      </Sample>

      <Sample title="Clear button">
        <Select placeholder="gender" values={['Female', 'Male', 'Other']} selected="Female" showClearButton />
      </Sample>

      <Sample title="Search">
        <Select
          showSearchBox
          values={[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
        />
      </Sample>

      <Sample title="Full width">
        <Select fullWidth values={['Female', 'Male', 'Other']} placeholder="placeholder" />
      </Sample>
    </article>
  )
}
