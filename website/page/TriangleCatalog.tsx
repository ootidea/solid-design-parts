import { createRoot } from 'solid-js'
import { Triangle } from '../../src/Triangle'
import { Catalog } from './ComponentCatalogPage'

export const TriangleCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Size',
      direction: 'horizontal',
      children: (
        <>
          <Triangle width="1rem" height="50px" />
          <Triangle width="4%" />
          <Triangle height="1em" />
        </>
      ),
    },
    {
      title: 'Color',
      direction: 'horizontal',
      children: (
        <>
          <Triangle width="30px" color="#A1B2C3" />
          <Triangle width="30px" color="lightgreen" />
          <Triangle width="30px" color="hsla(0 40% 50% / 30%)" />
        </>
      ),
    },
    {
      title: 'Direction',
      direction: 'horizontal',
      children: (
        <>
          <Triangle width="1em" direction="right" color="gray" />
          <Triangle width="1em" direction="down" color="gray" />
          <Triangle width="1em" direction="left" color="gray" />
        </>
      ),
    },
  ],
}))
