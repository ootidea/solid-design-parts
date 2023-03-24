import { createRoot, createSignal } from 'solid-js'
import { AutoSizeTextArea } from '../../src/AutoSizeTextArea'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal('default value')

export const AutoSizeTextAreaCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <AutoSizeTextArea />
          <AutoSizeTextArea placeholder="placeholder" />
          <AutoSizeTextArea value="default value" />
        </>
      ),
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <AutoSizeTextArea value={value()} onChangeValue={setValue} />
          <div style={{ 'white-space': 'pre-wrap' }}>value: {JSON.stringify(value())}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <AutoSizeTextArea placeholder="placeholder" disabled />
          <AutoSizeTextArea value="default value" disabled />
        </>
      ),
    },
    {
      title: 'Error message',
      children: (
        <>
          <AutoSizeTextArea placeholder="placeholder" disabled />
          <AutoSizeTextArea value="default value" disabled />
        </>
      ),
    },
    {
      title: 'Validation',
      children: (
        <>
          <AutoSizeTextArea
            placeholder="placeholder"
            errorMessage={(value) => {
              if (value.length === 0) return 'Required'

              return
            }}
          />
          <AutoSizeTextArea
            value="Default value"
            errorMessage={(value) => {
              if (value.toLowerCase() !== value) return 'Uppercase letters are not allowed.'

              return
            }}
          />
        </>
      ),
    },
    {
      title: 'Validate initial value',
      description: 'If validateImmediately option is set, it perform validation even if the user did not edit it.',
      children: (
        <>
          <AutoSizeTextArea
            placeholder="placeholder"
            validateImmediately
            errorMessage={(value) => {
              if (value.length === 0) return 'Required'

              return
            }}
          />
          <AutoSizeTextArea
            value="Default value"
            validateImmediately
            errorMessage={(value) => {
              if (value.toLowerCase() !== value) return 'Uppercase letters are not allowed.'

              return
            }}
          />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <AutoSizeTextArea placeholder="placeholder" required />
          <AutoSizeTextArea
            placeholder="placeholder"
            required
            errorMessage="This field is required"
            validateImmediately
          />
        </>
      ),
    },
  ],
}))
