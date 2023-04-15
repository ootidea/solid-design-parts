import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Collapsible } from '../../library/Collapsible'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'

const collapsed = createSignalObject(false)

export const CollapsibleCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Collapsible title="Title">content</Collapsible>
          <Collapsible title="Title" collapsed>
            content
          </Collapsible>
        </>
      ),
    },
    {
      title: (
        <>
          Binding <code>collapsed</code> to signal
        </>
      ),
      children: (
        <>
          <Collapsible title="Title" collapsed={collapsed.value} onChangeCollapsed={collapsed.set}>
            content
          </Collapsible>
          <div>collapsed: {toLiteral(collapsed.value)}</div>
        </>
      ),
    },
    {
      title: 'Nested',
      children: (
        <>
          <Collapsible title="1">
            <Collapsible title="1.1">...</Collapsible>
            <Collapsible title="1.2">...</Collapsible>
          </Collapsible>
        </>
      ),
    },
  ],
}))
