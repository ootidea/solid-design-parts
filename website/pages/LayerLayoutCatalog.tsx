import { createRoot } from 'solid-js'
import { Gravity, IconButton, LayerLayout } from '../../library'
import chevronLeftIcon from '../images/chevron-left.svg'
import chevronRightIcon from '../images/chevron-right.svg'
import searchIcon from '../images/search.svg'
import { Catalog } from './ComponentCatalogPage'

export const LayerLayoutCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Badge',
      children: (
        <>
          <LayerLayout>
            <IconButton src={searchIcon} size="3em" />
            <Gravity to="top right">
              <Gravity
                style={{
                  width: '1.4em',
                  height: '1.4em',
                  'border-radius': '50%',
                  background: 'crimson',
                  color: 'white',
                  'font-size': '13px',
                }}
              >
                2
              </Gravity>
            </Gravity>
          </LayerLayout>
        </>
      ),
    },
    {
      title: 'Control buttons',
      children: (
        <>
          <LayerLayout>
            <img src="https://source.unsplash.com/400x300/?white" alt="" />
            <div
              style={{
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'space-between',
                height: '100%',
                'pointer-events': 'auto',
              }}
            >
              <IconButton src={chevronLeftIcon} size="2em" iconColor="white" backgroundColor="hsla(0 0% 40% / 0.5)" />
              <IconButton src={chevronRightIcon} size="2em" iconColor="white" backgroundColor="hsla(0 0% 40% / 0.5)" />
            </div>
          </LayerLayout>
        </>
      ),
    },
  ],
}))
