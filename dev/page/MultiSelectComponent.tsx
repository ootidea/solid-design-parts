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

      <Sample title="Disabled">
        <MultiSelect values={['Female', 'Male', 'Other']} placeholder="placeholder" disabled />
        <MultiSelect values={['Female', 'Male', 'Other']} selected={new Set(['Female', 'Male'])} disabled />
      </Sample>

      <Sample title="Error message">
        <MultiSelect values={['Female', 'Male', 'Other']} errorMessage="Invalid value" />
      </Sample>

      <Sample title="Validation">
        <MultiSelect
          values={['Female', 'Male', 'Other']}
          errorMessage={(selected) => {
            if (selected.size < 2) return 'Select multiple options'

            return
          }}
        />
      </Sample>

      <Sample
        title="Force validation"
        description="If validateInitialValue option is set, it perform validation even if the user did not edit it."
      >
        <MultiSelect
          values={['Female', 'Male', 'Other']}
          validateInitialValue
          errorMessage={(selected) => {
            if (selected.size < 2) return 'Select multiple options'

            return
          }}
        />
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
