import { createSignal } from 'solid-js'
import { AutoSizeTextArea } from '../../src/AutoSizeTextArea'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function AutoSizeTextAreaComponent() {
  const [value, setValue] = createSignal('default value')

  return (
    <article>
      <PageTitle>AutoSizeTextArea</PageTitle>

      <Sample title="Basic example">
        <AutoSizeTextArea />
      </Sample>

      <Sample title="Placeholder">
        <AutoSizeTextArea placeholder="placeholder" />
      </Sample>

      <Sample title="Default value">
        <AutoSizeTextArea value="default value" />
      </Sample>

      <Sample title="Bind to signal">
        <AutoSizeTextArea value={value()} onChangeValue={setValue} />
        <div style={{ 'white-space': 'pre-wrap' }}>value() === `{value()}`</div>
      </Sample>

      <Sample title="Disabled">
        <AutoSizeTextArea placeholder="placeholder" disabled />
        <AutoSizeTextArea value="default value" disabled />
      </Sample>
    </article>
  )
}
