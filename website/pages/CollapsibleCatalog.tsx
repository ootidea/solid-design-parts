import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Collapsible } from '../../library'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'

const collapsed = createSignalObject(false)

export const CollapsibleCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <Collapsible title="Title">
            <p>content</p>
          </Collapsible>
        </>
      ),
    },
    {
      title: {
        default: (
          <>
            Binding <code>collapsed</code> to a signal
          </>
        ),
        ja: (
          <>
            <code>collapsed</code>とsignalの双方向バインディング
          </>
        ),
      },
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
