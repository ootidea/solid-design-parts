import { createSignal, For } from 'solid-js'
import { Button } from '../../src/Button'
import { Gravity } from '../../src/Gravity'
import { Modal } from '../../src/Modal'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ModalComponent() {
  const [opened, setOpened] = createSignal(false)

  return (
    <article>
      <PageTitle>Modal</PageTitle>

      <Sample title="Basic example">
        <Modal launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">This is sample text for Modal component.</div>
        </Modal>
      </Sample>

      <Sample title="Persistent">
        <Modal persistent launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          {({ close }) => <Button onClick={close}>Close</Button>}
        </Modal>
      </Sample>

      <Sample title="Bind to signal">
        <Button onClick={() => setOpened(true)}>Open</Button>
        <div>opened() === {String(opened())}</div>
        <Modal opened={opened()} onChangeOpened={setOpened}>
          <Button onClick={() => setOpened(false)}>Close</Button>
        </Modal>
      </Sample>

      <Sample title="Close button">
        <Modal showCloseButton launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">This is sample text for Modal component.</div>
        </Modal>
      </Sample>

      <Sample title="Title">
        <Modal title="Title" launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">
            This is sample text for Modal component.
            <For each={[...Array(30).keys()]}>{(i) => <p>{i}</p>}</For>
          </div>
        </Modal>
      </Sample>

      <Sample title="Footer">
        <Modal
          launcher={({ open }) => <Button onClick={open}>Open</Button>}
          footer={({ close }) => (
            <Gravity to="right" style="padding: 0.5em;">
              <Button onClick={close}>Close</Button>
            </Gravity>
          )}
        >
          <div style="padding: 1em">
            This is sample text for Modal component.
            <For each={[...Array(30).keys()]}>{(i) => <p>{i}</p>}</For>
          </div>
        </Modal>
      </Sample>
    </article>
  )
}
