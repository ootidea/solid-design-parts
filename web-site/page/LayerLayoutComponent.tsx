import { Gravity } from '../../src/Gravity'
import { IconButton } from '../../src/IconButton'
import { LayerLayout } from '../../src/LayerLayout'
import chevronLeftIcon from './chevron-left.svg'
import chevronRightIcon from './chevron-right.svg'
import { Catalog } from './ComponentCatalog'
import searchIcon from './search.svg'

export const LayerLayoutCatalog: Catalog = {
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
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Polar_Bear_ANWR_1.jpg/320px-Polar_Bear_ANWR_1.jpg"
              alt="polar bear"
            />
            <div
              style={{
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'space-between',
                height: '100%',
                'pointer-events': 'auto',
              }}
            >
              <IconButton src={chevronLeftIcon} size="2em" iconColor="white" backgroundColor="hsla(0 0% 40% 0.5)" />
              <IconButton src={chevronRightIcon} size="2em" iconColor="white" backgroundColor="hsla(0 0% 40% 0.5)" />
            </div>
          </LayerLayout>
        </>
      ),
    },
  ],
}
