import { createRoot } from 'solid-js'
import { createSignalObject } from 'solid-signal-object'
import { Foldable } from '../../library/Foldable'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'

const unfolded = createSignalObject(false)

export const FoldableCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Foldable title="Title">content</Foldable>
          <Foldable title="Title" unfolded>
            content
          </Foldable>
        </>
      ),
    },
    {
      title: (
        <>
          Binding <code>unfolded</code> to signal
        </>
      ),
      children: (
        <>
          <Foldable title="Title" unfolded={unfolded.value} onChangeUnfolded={unfolded.set}>
            content
          </Foldable>
          <div>unfolded: {toLiteral(unfolded.value)}</div>
        </>
      ),
    },
    {
      title: 'Nested',
      children: (
        <>
          <Foldable title="1" unfolded>
            <Foldable title="1.1">...</Foldable>
            <Foldable title="1.2">...</Foldable>
          </Foldable>
        </>
      ),
    },
  ],
}))
