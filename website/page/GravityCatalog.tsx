import { createRoot } from 'solid-js'
import { Gravity } from '../../library'
import { Catalog } from './ComponentCatalogPage'

export const GravityCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity>center</Gravity>
          </div>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity to="bottom">bottom</Gravity>
          </div>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity to="left">left</Gravity>
          </div>
        </>
      ),
    },
    {
      title: 'Corners',
      children: (
        <>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity to="top right">top right</Gravity>
          </div>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity to="bottom left">bottom left</Gravity>
          </div>
        </>
      ),
    },
    {
      title: 'Shorthand notation',
      children: (
        <>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity.top>top</Gravity.top>
          </div>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity.bottomRight>top right</Gravity.bottomRight>
          </div>
        </>
      ),
    },
  ],
}))
