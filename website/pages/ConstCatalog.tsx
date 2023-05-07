import { createRoot, createSignal } from 'solid-js'
import { Button, Modal, TextInput } from '../../library'
import { Const } from '../../library/Const'
import { Catalog } from './ComponentCatalogPage'

export const ConstCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: <Const value={Math.random()}>{(value) => <div>value: {value}</div>}</Const>,
    },
    {
      title: 'Temporal state',
      children: (
        <Modal launcher={({ openModal }) => <Button onClick={openModal}>Open modal</Button>}>
          <Const value={createSignal('Initial value')}>
            {([value, setValue]) => (
              <div style="padding: 1em">
                <p>This test field is bound to a signal with the same lifecycle as the modal.</p>
                <TextInput value={value()} onChangeValue={setValue} />
              </div>
            )}
          </Const>
        </Modal>
      ),
    },
  ],
}))
