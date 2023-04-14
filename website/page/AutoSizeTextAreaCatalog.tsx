import { createRoot, createSignal } from 'solid-js'
import { AutoSizeTextArea } from '../../library/AutoSizeTextArea'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal('default value')

export const AutoSizeTextAreaCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>AutoSizeTextArea</code> is a component for inputting multiline text. The height is automatically adjusted
      according to the content, unlike the textarea element. If you want to input single-line text, please use{' '}
      <code>TextInput</code> instead.
    </>
  ),
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
      title: (
        <>
          Binding <code>value</code> to signal
        </>
      ),
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
      title: 'Error state',
      children: (
        <>
          <AutoSizeTextArea placeholder="placeholder" error />
          <AutoSizeTextArea error="Error message" />
        </>
      ),
    },
    {
      title: 'Required',
      description: (
        <>
          Using <code>required</code> makes one or more characters of input mandatory.
        </>
      ),
      children: (
        <>
          <AutoSizeTextArea placeholder="placeholder" required />
          <AutoSizeTextArea placeholder="placeholder" required error="This field is required." />
        </>
      ),
    },
    {
      title: 'Minimum and maximum character count',
      children: (
        <>
          <AutoSizeTextArea min={10} />
          <AutoSizeTextArea value="123456789" max={9} error="Up to a maximum of 9 characters." />
        </>
      ),
    },
    {
      title: 'Changing of the method for counting length',
      children: (
        <>
          <AutoSizeTextArea
            max={3}
            lengthMeasure={(text) => text.split('\n').length}
            error="Up to three lines can be entered."
          />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <AutoSizeTextArea placeholder="placeholder" error={(value) => value.length === 0 && 'Required'} />
          <AutoSizeTextArea
            value="Default value"
            error={(value) => value.toLowerCase() !== value && 'Uppercase letters are not allowed.'}
          />
        </>
      ),
    },
    {
      title: 'Validate initial value',
      description: (
        <>
          If <code>validateImmediately</code> option is set, it perform validation even if the user did not edit it.
        </>
      ),
      children: (
        <>
          <AutoSizeTextArea
            placeholder="placeholder"
            validateImmediately
            error={(value) => value.length === 0 && 'Required'}
          />
          <AutoSizeTextArea
            value="Default value"
            validateImmediately
            error={(value) => value.toLowerCase() !== value && 'Uppercase letters are not allowed.'}
          />
        </>
      ),
    },
  ],
}))
