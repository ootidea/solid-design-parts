import { createRoot, createSignal } from 'solid-js'
import { Foldable } from '../../src/Foldable'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalog'

const [unfolded, setUnfolded] = createSignal(false)

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
      title: 'Bind to signal',
      children: (
        <>
          <Foldable title="Title" unfolded={unfolded()} onChangeUnfolded={setUnfolded}>
            content
          </Foldable>
          <div>unfolded: {toLiteral(unfolded())}</div>
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
