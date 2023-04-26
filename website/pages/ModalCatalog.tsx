import { createRoot, createSignal, For } from 'solid-js'
import { Button, Gravity, Modal } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [opened, setOpened] = createSignal(false)

export const ModalCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <Modal launcher={({ openModal }) => <Button onClick={openModal}>Open</Button>}>
          <div style="padding: 1em">This is sample text for Modal component.</div>
        </Modal>
      ),
    },
    {
      title: (
        <>
          Binding <code>opened</code> to a signal
        </>
      ),
      children: (
        <>
          <Button onClick={() => setOpened(true)}>Open</Button>
          <div>opened: {String(opened())}</div>
          <Modal opened={opened()} onChangeOpened={setOpened}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </Modal>
        </>
      ),
    },
    {
      title: 'Close button',
      children: (
        <>
          <Modal showCloseButton launcher={({ openModal }) => <Button onClick={openModal}>Open</Button>}>
            <div style="padding: 1em">This is sample text for Modal component.</div>
          </Modal>
        </>
      ),
    },
    {
      title: 'Title',
      children: (
        <>
          <Modal title="Title" launcher={({ openModal }) => <Button onClick={openModal}>Open</Button>}>
            <div style="padding: 1em">
              This is sample text for Modal component.
              <For each={[...Array(30).keys()]}>{(i) => <p>{i}</p>}</For>
            </div>
          </Modal>
        </>
      ),
    },
    {
      title: 'Footer',
      children: (
        <>
          <Modal
            launcher={({ openModal }) => <Button onClick={openModal}>Open</Button>}
            footer={({ closeModal }) => (
              <Gravity to="right" style="padding: 0.5em;">
                <Button onClick={closeModal}>Close</Button>
              </Gravity>
            )}
          >
            <div style="padding: 1em">
              This is sample text for Modal component.
              <For each={[...Array(30).keys()]}>{(i) => <p>{i}</p>}</For>
            </div>
          </Modal>
        </>
      ),
    },
    {
      title: 'Background color of overlay',
      children: (
        <>
          <Modal
            overlayBackgroundColor="transparent"
            launcher={({ openModal }) => <Button onClick={openModal}>Open</Button>}
          >
            <div style="padding: 1em">This is sample text for Modal component.</div>
          </Modal>
          <br />
          <Modal
            overlayBackgroundColor="rgba(0 0 0 / 30%)"
            launcher={({ openModal }) => <Button onClick={openModal}>Open</Button>}
          >
            <div style="padding: 1em">This is sample text for Modal component.</div>
          </Modal>
        </>
      ),
    },
    {
      title: 'Disabling auto close',
      description: (
        <>
          When <code>disableAutoClose</code> is set, the modal will not close upon pressing the Esc key or clicking
          outside the modal.
        </>
      ),
      children: (
        <Modal disableAutoClose launcher={({ openModal }) => <Button onClick={openModal}>Open</Button>}>
          {({ closeModal }) => (
            <div style={{ padding: '1em', display: 'grid', 'grid-auto-flow': 'row' }}>
              <p>It can only be closed by pressing the button below.</p>
              <Button onClick={closeModal}>Close</Button>
            </div>
          )}
        </Modal>
      ),
    },
  ],
}))
