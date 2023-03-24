import { createRoot } from 'solid-js'
import { Gravity } from '../../src/Gravity'
import { Catalog } from './ComponentCatalog'

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
            <Gravity to="bottom">center</Gravity>
          </div>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity to="left">center</Gravity>
          </div>
        </>
      ),
    },
    {
      title: 'Corners',
      children: (
        <>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity to="top right">center</Gravity>
          </div>
          <div style={{ width: '12rem', height: '9rem', border: '1px dashed gray' }}>
            <Gravity to="bottom left">center</Gravity>
          </div>
        </>
      ),
    },
  ],
}))
