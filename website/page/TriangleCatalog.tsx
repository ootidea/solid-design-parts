import { createRoot } from 'solid-js'
import { Triangle } from '../../src/Triangle'
import { Catalog } from './ComponentCatalogPage'

export const TriangleCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      direction: 'horizontal',
      children: <Triangle height="1.4em" baseLength="2em" />,
    },
    {
      title: 'Color',
      direction: 'horizontal',
      children: (
        <>
          <Triangle height="1.4em" baseLength="2em" color="hsl(0 0% 70%)" />
          <Triangle height="1.4em" baseLength="2em" color="lightgreen" />
        </>
      ),
    },
    {
      title: 'Direction',
      direction: 'horizontal',
      children: (
        <>
          <Triangle height="1.5em" baseLength="1.5em" color="gray" direction="right" />
          <Triangle height="1.5em" baseLength="1.5em" color="gray" direction="bottom" />
          <Triangle height="1.5em" baseLength="1.5em" color="gray" direction="left" />
        </>
      ),
    },
  ],
}))
