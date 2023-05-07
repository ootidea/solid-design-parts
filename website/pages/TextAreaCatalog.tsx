import { createRoot, createSignal } from 'solid-js'
import { TextArea } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal('default value')

export const TextAreaCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>TextArea</code> is a component for inputting multiline text. The height is automatically adjusted according
      to the content, unlike the textarea element. If you want to input single-line text, please use{' '}
      <code>TextInput</code> instead.
    </>
  ),
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <TextArea />
          <TextArea placeholder="placeholder" />
          <TextArea value="default value" />
        </>
      ),
    },
    {
      title: (
        <>
          Binding <code>value</code> to a signal
        </>
      ),
      children: (
        <>
          <TextArea value={value()} onChangeValue={setValue} />
          <div style={{ 'white-space': 'pre-wrap' }}>value: {JSON.stringify(value())}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <TextArea placeholder="placeholder" disabled />
          <TextArea value="default value" disabled />
        </>
      ),
    },
    {
      title: 'Error state',
      children: (
        <>
          <TextArea placeholder="placeholder" error />
          <TextArea error="Error message" />
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
          <TextArea placeholder="placeholder" required />
          <TextArea placeholder="placeholder" required error="This field is required." />
        </>
      ),
    },
    {
      title: 'Minimum and maximum character count',
      children: (
        <>
          <TextArea min={10} />
          <TextArea value="123456789" max={9} error="Up to a maximum of 9 characters." />
        </>
      ),
    },
    {
      title: 'Changing of the method for counting length',
      children: (
        <>
          <TextArea
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
          <TextArea placeholder="placeholder" error={(value) => value.length === 0 && 'Required'} />
          <TextArea
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
          <TextArea placeholder="placeholder" validateImmediately error={(value) => value.length === 0 && 'Required'} />
          <TextArea
            value="Default value"
            validateImmediately
            error={(value) => value.toLowerCase() !== value && 'Uppercase letters are not allowed.'}
          />
        </>
      ),
    },
  ],
}))
