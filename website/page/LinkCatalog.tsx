import { createRoot } from 'solid-js'
import { Link } from '../../src/Link'
import { Catalog } from './ComponentCatalogPage'

export const LinkCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: <Link href="https://example.com">sample</Link>,
    },
  ],
}))
