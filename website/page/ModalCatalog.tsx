import { createRoot, createSignal, For } from 'solid-js'
import { Button } from '../../src/Button'
import { Gravity } from '../../src/Gravity'
import { Modal } from '../../src/Modal'
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
      title: 'Persistent',
      children: (
        <Modal persistent launcher={({ openModal }) => <Button onClick={openModal}>Open</Button>}>
          {({ closeModal }) => <Button onClick={closeModal}>Close</Button>}
        </Modal>
      ),
    },
    {
      title: 'Bind to signal',
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
  ],
}))
