import { createRoot } from 'solid-js'
import { Button } from '../../src/Button'
import { Popover } from '../../src/Popover'
import { Catalog } from './ComponentCatalogPage'

export const PopoverCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <Popover launcher={({ openPopover }) => <Button onClick={openPopover}>Open</Button>}>
          <h1>Title</h1>
          <p>contents</p>
        </Popover>
      ),
    },
    {
      title: 'Simple position',
      children: (
        <Popover on="top right" launcher={({ openPopover }) => <Button onClick={openPopover}>Open</Button>}>
          <div style="padding: 0.5em 1em">Pop up text</div>
        </Popover>
      ),
    },
    {
      title: 'Detail position',
      children: (
        <Popover
          on="bottom right"
          joint="bottom right"
          launcher={({ togglePopover }) => (
            <div style="width: 20rem; height: 10rem; background-color: aliceblue">
              <Button onClick={togglePopover}>Open in right bottom</Button>
            </div>
          )}
        >
          <div style="padding: 0.2em 0.4em">Pop up text</div>
        </Popover>
      ),
    },
    {
      title: 'Persistent',
      children: (
        <Popover persistent launcher={({ togglePopover }) => <Button onClick={togglePopover}>Open</Button>}>
          {({ closePopover }) => <Button onClick={closePopover}>Close</Button>}
        </Popover>
      ),
    },
  ],
}))
