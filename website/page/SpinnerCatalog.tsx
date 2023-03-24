import { createRoot } from 'solid-js'
import { Spinner } from '../../src/Spinner'
import { Catalog } from './ComponentCatalogPage'

export const SpinnerCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      direction: 'horizontal',
      children: (
        <>
          <Spinner />
        </>
      ),
    },
    {
      title: 'Size',
      direction: 'horizontal',
      children: (
        <>
          <Spinner size="10px" />
          <Spinner size="1em" />
          <Spinner size="2rem" />
        </>
      ),
    },
    {
      title: 'Frequency',
      description: 'Change the number of rotations per seconds.',
      direction: 'horizontal',
      children: (
        <>
          <Spinner frequency={0.7} />
          <Spinner frequency={1.4} />
          <Spinner frequency={2.1} />
          <Spinner frequency={2.8} />
        </>
      ),
    },
    {
      title: 'Thickness',
      direction: 'horizontal',
      children: (
        <>
          <Spinner thickness={10} />
          <Spinner thickness={25} />
          <Spinner thickness={50} />
          <Spinner thickness={80} />
        </>
      ),
    },
    {
      title: 'Color',
      direction: 'horizontal',
      children: (
        <>
          <Spinner color="currentColor" />
          <Spinner color="green" />
          <Spinner color="hsl(0 90% 50%)" />
        </>
      ),
    },
  ],
}))
