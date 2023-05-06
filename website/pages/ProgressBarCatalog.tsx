import { createRoot } from 'solid-js'
import { Catalog } from './ComponentCatalogPage'
import { ProgressBar } from '../../library/ProgressBar'

export const ProgressBarCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <ProgressBar />
          <ProgressBar value={0.5} />
          <ProgressBar value={1} />
        </>
      ),
    },
  ],
}))
