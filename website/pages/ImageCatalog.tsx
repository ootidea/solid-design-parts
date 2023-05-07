import { createRoot } from 'solid-js'
import { Image } from '../../library'
import { Catalog } from './ComponentCatalogPage'

export const ImageCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: <Image src="https://source.unsplash.com/400x300/?random" />,
    },
    {
      title: 'Fallback',
      children: <Image src="https://example.com" fallback={<>Fallback slot</>} />,
    },
  ],
}))
