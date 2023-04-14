import { createRoot } from 'solid-js'
import { Divider, IconButton } from '../../library'
import { Button } from '../../library/Button'
import { Popover } from '../../library/Popover'
import { Catalog } from './ComponentCatalogPage'
import verticalEllipsisIcon from './vertical-ellipsis.svg'

export const PopoverCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <Popover launcher={({ openPopover }) => <Button onClick={openPopover}>Open</Button>}>
          <p style={{ padding: '2em' }}>contents</p>
        </Popover>
      ),
    },
    {
      title: 'Simple placement',
      children: (
        <Popover placement="top right" launcher={({ openPopover }) => <Button onClick={openPopover}>Open</Button>}>
          <div style="padding: 0.5em 1em">Pop up text</div>
        </Popover>
      ),
    },
    {
      title: 'Advanced placement',
      children: (
        <Popover
          placement="bottom right"
          joint="top right"
          launcher={({ togglePopover }) => <IconButton src={verticalEllipsisIcon} onClick={togglePopover} />}
        >
          <div style="padding: 0.5em 1em">Dropdown menu</div>
          <Divider />
          <div style="padding: 0.5em 1em">Dropdown menu</div>
        </Popover>
      ),
    },
    {
      title: 'Persistent',
      children: (
        <Popover persistent launcher={({ togglePopover }) => <Button onClick={togglePopover}>Open</Button>}>
          {({ closePopover }) => (
            <div style={{ padding: '0.8em 1.8em', cursor: 'pointer' }} onClick={closePopover}>
              Close
            </div>
          )}
        </Popover>
      ),
    },
  ],
}))
