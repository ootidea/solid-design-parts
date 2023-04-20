import { createRoot, For } from 'solid-js'
import { Image, Scrollable } from '../../library'
import { Catalog } from './ComponentCatalogPage'

export const ScrollableCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Scrollable</code> is a component that displays a scrollbar when the content overflows. The scrollbar is
      created with CSS, so it is cross-browser and customizable.
    </>
  ),
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <div style={{ height: '10rem' }}>
            <Scrollable>
              <For each={[...Array(10).keys()]}>{(i) => <p>{i}</p>}</For>
            </Scrollable>
          </div>

          <div style={{ height: '7rem', width: 'max-content' }}>
            <Scrollable>
              <Image src="https://source.unsplash.com/400x300/?random" />,
            </Scrollable>
          </div>
        </>
      ),
    },
  ],
}))
