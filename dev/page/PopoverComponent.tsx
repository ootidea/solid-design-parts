import { Button } from '../../src/Button'
import { Popover } from '../../src/Popover'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function PopoverComponent() {
  return (
    <article>
      <PageTitle>Popover</PageTitle>

      <Sample title="Basic example">
        <Popover launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <h1>Title</h1>
          <p>contents</p>
        </Popover>
      </Sample>

      <Sample title="Persistent">
        <Popover persistent launcher={({ toggle }) => <Button onClick={toggle}>Open</Button>}>
          {({ close }) => <Button onClick={close}>Close</Button>}
        </Popover>
      </Sample>

      <Sample title="Simple position">
        <Popover on="top right" launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 0.5em 1em">Pop up text</div>
        </Popover>
      </Sample>

      <Sample title="Detail position">
        <Popover
          on="bottom right"
          joint="bottom right"
          launcher={({ toggle }) => (
            <div style="width: 20rem; height: 10rem; background-color: aliceblue">
              <Button onClick={toggle}>Open in right bottom</Button>
            </div>
          )}
        >
          <div style="padding: 0.2em 0.4em">Pop up text</div>
        </Popover>
      </Sample>
    </article>
  )
}
