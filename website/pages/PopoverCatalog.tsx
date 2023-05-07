import { createRoot } from 'solid-js'
import { Button, Divider, IconButton, Popover } from '../../library'
import verticalEllipsisIcon from '../images/vertical-ellipsis.svg'
import { Catalog } from './ComponentCatalogPage'

export const PopoverCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
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
      title: 'Disabling auto close',
      description: (
        <>
          When <code>disableAutoClose</code> is set, the popover will not close upon pressing the Esc key or clicking
          outside the popover.
        </>
      ),
      children: (
        <Popover disableAutoClose launcher={({ togglePopover }) => <Button onClick={togglePopover}>Open</Button>}>
          {({ closePopover }) => (
            <div style={{ padding: '1em', display: 'grid', 'grid-auto-flow': 'row' }}>
              <p>It can only be closed by pressing the button below.</p>
              <Button onClick={closePopover}>Close</Button>
            </div>
          )}
        </Popover>
      ),
    },
  ],
}))
