import { createSignal, For } from "solid-js";
import { Button } from "../../src/Button";
import { Gravity } from "../../src/Gravity";
import { Modal } from "../../src/Modal";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function ModalComponent() {
  const [opened, setOpened] = createSignal(false);

  return (
    <article>
      <PageTitle>Modal</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <Modal launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">This is sample text for Modal component.</div>
        </Modal>
      </Sample>

      <Sample id="persistent" title="Persistent">
        <Modal persistent launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          {({ close }) => <Button onClick={close}>Close</Button>}
        </Modal>
      </Sample>

      <Sample id="bind-to-signal" title="Bind to signal">
        <Button onClick={() => setOpened(true)}>Open</Button>
        <div>opened() === {String(opened())}</div>
        <Modal opened={opened()} onChangeOpened={setOpened}>
          <Button onClick={() => setOpened(false)}>Close</Button>
        </Modal>
      </Sample>

      <Sample id="close-button" title="Close button">
        <Modal showCloseButton launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">This is sample text for Modal component.</div>
        </Modal>
      </Sample>

      <Sample id="title" title="Title">
        <Modal title="Title" launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">
            This is sample text for Modal component.
            <For each={[...Array(30).keys()]}>{(i) => <p>{i}</p>}</For>
          </div>
        </Modal>
      </Sample>

      <Sample id="footer" title="Footer">
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
  );
}
