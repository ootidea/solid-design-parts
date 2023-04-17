import { createRoot } from 'solid-js'
import { Image } from '../../library'
import { Catalog } from './ComponentCatalogPage'

export const ImageCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Polar_Bear_ANWR_1.jpg/320px-Polar_Bear_ANWR_1.jpg" />
      ),
    },
    {
      title: 'Fallback',
      children: <Image src="https://example.com" fallback={<>Fallback slot</>} />,
    },
  ],
}))
