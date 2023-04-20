import { createRoot, createSignal } from 'solid-js'
import { Image, Resizable } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [widthPx, setWidthPx] = createSignal(500)

export const ResizableCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Resizable>
            <div style={{ border: '1px dashed gray', padding: '1em' }}>Resizable div element example</div>
          </Resizable>

          <Resizable>
            <Image width="100%" src="https://source.unsplash.com/200x200/?white" />
          </Resizable>
        </>
      ),
    },
    {
      title: (
        <>
          Binding <code>widthPx</code> to a signal
        </>
      ),
      children: (
        <>
          <Resizable widthPx={widthPx()} onChangeWidthPx={setWidthPx}>
            <div style={{ border: '1px dashed gray', padding: '1em' }}>widthPx: {widthPx()}</div>
          </Resizable>
        </>
      ),
    },
    {
      title: 'min-width and max-width',
      children: (
        <>
          <Resizable style={{ 'min-width': '400px', 'max-width': '70%' }}>
            <div style={{ border: '1px dashed gray', padding: '1em' }}>min-width: 400px; max-width: 70%</div>
          </Resizable>

          <Resizable style={{ 'min-width': 'initial', 'max-width': 'initial' }}>
            <div style={{ border: '1px dashed gray', padding: '1em' }}>No range restrictions</div>
          </Resizable>
        </>
      ),
    },
    {
      title: 'Split layout',
      children: (
        <>
          <div style={{ display: 'grid', 'grid-template-columns': 'auto minmax(0, 1fr)' }}>
            <Resizable>
              <div style={{ display: 'grid', 'place-items': 'center', background: 'hsl(0 50% 97%)', padding: '3em' }}>
                left side
              </div>
            </Resizable>
            <div style={{ display: 'grid', 'place-items': 'center', background: 'hsl(120 50% 97%)' }}>right side</div>
          </div>
        </>
      ),
    },
  ],
}))
