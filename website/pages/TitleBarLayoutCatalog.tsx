import { createRoot } from 'solid-js'
import { IconButton, TitleBarLayout } from '../../library'
import chevronLeftIcon from '../images/chevron-left.svg'
import chevronRightIcon from '../images/chevron-right.svg'
import { Catalog } from './ComponentCatalogPage'

export const TitleBarLayoutCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>TitleBarLayout</code> is a component that represents a layout with a centered title and elements that are
      left and/or right aligned.
    </>
  ),
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <TitleBarLayout
            right={
              <>
                next
                <IconButton src={chevronRightIcon} iconSize="100%" />
              </>
            }
          >
            Sample title
          </TitleBarLayout>
          <TitleBarLayout
            left={
              <>
                <IconButton src={chevronLeftIcon} iconSize="100%" />
                previous
              </>
            }
          >
            Sample title
          </TitleBarLayout>
          <TitleBarLayout
            left={
              <>
                <IconButton src={chevronLeftIcon} iconSize="100%" />
                previous
              </>
            }
            right={
              <>
                next
                <IconButton src={chevronRightIcon} iconSize="100%" />
              </>
            }
          >
            Sample title
          </TitleBarLayout>
        </>
      ),
    },
  ],
}))
