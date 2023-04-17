import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Collapsible } from '../../library'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'

const collapsed = createSignalObject(false)

export const CollapsibleCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Collapsible title="Title">
            <p>content</p>
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
            <p>content</p>
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
            <Collapsible title="1.1">
              <p>…</p>
            </Collapsible>
            <Collapsible title="1.2">
              <p>…</p>
            </Collapsible>
          </Collapsible>
        </>
      ),
    },
  ],
}))
