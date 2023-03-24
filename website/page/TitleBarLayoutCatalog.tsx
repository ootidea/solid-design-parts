import { createRoot } from 'solid-js'
import { IconButton } from '../../src/IconButton'
import { TitleBarLayout } from '../../src/TitleBarLayout'
import chevronLeftIcon from './chevron-left.svg'
import chevronRightIcon from './chevron-right.svg'
import { Catalog } from './ComponentCatalogPage'

export const TitleBarLayoutCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <TitleBarLayout right={<IconButton src={chevronRightIcon} iconSize="100%" />}>Sample title</TitleBarLayout>
          <TitleBarLayout left={<IconButton src={chevronLeftIcon} iconSize="100%" />}>Sample title</TitleBarLayout>
          <TitleBarLayout
            left={<IconButton src={chevronLeftIcon} iconSize="100%" />}
            right={<IconButton src={chevronRightIcon} iconSize="100%" />}
          >
            Sample title
          </TitleBarLayout>
        </>
      ),
    },
  ],
}))
