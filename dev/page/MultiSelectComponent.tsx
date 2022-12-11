import { createSignal } from 'solid-js'
import { MultiSelect } from '../../src/MultiSelect'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function MultiSelectComponent() {
  const [selected, setSelected] = createSignal(new Set(['Other']), { equals: false })

  return (
    <article>
      <PageTitle>MultiSelect</PageTitle>

      <Sample title="Basic example">
        <MultiSelect values={['Female', 'Male', 'Other']} />
      </Sample>

      <Sample title="Placeholder">
        <MultiSelect values={['Female', 'Male', 'Other']} placeholder="placeholder" />
      </Sample>

      <Sample title="Change titles">
        <MultiSelect values={['dog', 'cat', 'rabbit']} titles={{ dog: '🐶', cat: '😺', rabbit: '🐰' }} />
      </Sample>

      <Sample title="Default selected">
        <MultiSelect values={['Female', 'Male', 'Other']} selected={new Set(['Female', 'Male'])} />
      </Sample>

      <Sample title="Bind to signal">
        <MultiSelect values={['Female', 'Male', 'Other']} selected={selected()} onChangeSelected={setSelected} />
        <div>JSON.stringify([...selected()]) === '{JSON.stringify([...selected()])}'</div>
      </Sample>

      <Sample title="Disabled" direction="horizontal">
        <MultiSelect values={['Female', 'Male', 'Other']} placeholder="placeholder" disabled />
        <MultiSelect values={['Female', 'Male', 'Other']} selected={new Set(['Female', 'Male'])} disabled />
      </Sample>

      <Sample title="Search">
        <MultiSelect
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
        <MultiSelect fullWidth values={['Female', 'Male', 'Other']} placeholder="placeholder" />
      </Sample>
    </article>
  )
}
