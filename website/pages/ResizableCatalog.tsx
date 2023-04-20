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
            <Image
              width="100%"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Polar_Bear_ANWR_1.jpg/320px-Polar_Bear_ANWR_1.jpg"
            />
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
          <Resizable onChangeWidthPx={setWidthPx}>
            <div
              style={{ width: `${widthPx()}px`, border: '1px dashed gray', padding: '1em', 'box-sizing': 'border-box' }}
            >
              widthPx: {widthPx()}
            </div>
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
  ],
}))
