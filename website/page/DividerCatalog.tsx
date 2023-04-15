import { createRoot } from 'solid-js'
import { Divider } from '../../library/Divider'
import { Catalog } from './ComponentCatalogPage'

export const DividerCatalog: Catalog = createRoot(() => ({
  samples: [
    { title: 'Basic example', children: <Divider /> },
    {
      title: 'Color',
      children: (
        <>
          <Divider color="green" />
          <Divider color="hsl(0 0% 0%)" />
          <Divider color="linear-gradient(to right, red, blue)" />
        </>
      ),
    },
    {
      title: 'Thickness',
      children: (
        <>
          <Divider thickness="1px" />
          <Divider thickness="0.2em" />
          <Divider thickness="0.5rem" />
        </>
      ),
    },
    {
      title: 'Vertical divider',
      children: (
        <>
          <div style="height: 80px; display: grid; place-items: center;">
            <Divider direction="vertical" />
          </div>
        </>
      ),
    },
  ],
}))
