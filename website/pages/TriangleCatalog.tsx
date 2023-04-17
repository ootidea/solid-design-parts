import { createRoot } from 'solid-js'
import { Triangle } from '../../library'
import { Catalog } from './ComponentCatalogPage'

export const TriangleCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Triangle</code> is a component that displays a dynamically generated triangular SVG. Unlike implementation
      with border, you can use % for width and height.
    </>
  ),
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
          <Triangle color="#A1B2C3" width="30px" />
          <Triangle color="lightgreen" width="30px" />
          <Triangle color="hsla(0 40% 50% / 30%)" width="30px" />
        </>
      ),
    },
    {
      title: 'Direction',
      direction: 'horizontal',
      children: (
        <>
          <Triangle direction="right" width="1em" color="gray" />
          <Triangle direction="down" width="1em" color="gray" />
          <Triangle direction="left" width="1em" color="gray" />
        </>
      ),
    },
    {
      title: 'Skew',
      direction: 'horizontal',
      children: (
        <>
          <Triangle skew="40deg" width="2em" color="gray" />
          <Triangle skew="-0.1turn" width="1em" height="2em" color="gray" />
          <Triangle skew="0.6rad" width="2em" direction="left" />
        </>
      ),
    },
    {
      title: 'The origin of skew transformation',
      description: (
        <>
          By default, the center of skew transformation is the midpoint of the base. This can be changed by setting the
          <code>transformOrigin</code>. The vertex of the triangle can be particularly useful in pointing out other
          elements when specified.
        </>
      ),
      children: (
        <>
          <div style={{ width: '3em', border: '1px dashed gray' }}>
            <Triangle skew="40deg" color="rgba(0 0 0 /30%)" />
          </div>
          <div style={{ width: '3em', border: '1px dashed gray' }}>
            <Triangle skew="40deg" transformOrigin="top" color="rgba(0 0 0 /30%)" />
          </div>
        </>
      ),
    },
  ],
}))
