import { createRoot } from 'solid-js'
import { Icon } from '../../library'
import badOutlineIcon from '../images/bad-outline.svg'
import chevronLeftIcon from '../images/chevron-left.svg'
import goodOutlineIcon from '../images/good-outline.svg'
import { Catalog } from './ComponentCatalogPage'

export const IconCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      The <code>Icon</code> component displays a monochrome icon. The colors of icons are styled using CSS. In other
      words, the color information in the image file is ignored, and only the shape of the icon is referenced.
    </>
  ),
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      direction: 'horizontal',
      children: (
        <>
          <Icon src={chevronLeftIcon} />
        </>
      ),
    },
    {
      title: 'Size',
      direction: 'horizontal',
      children: (
        <>
          <Icon src={chevronLeftIcon} size="1em" />
          <Icon src={chevronLeftIcon} size="2rem" />
          <Icon src={chevronLeftIcon} size="40px" />
        </>
      ),
    },
    {
      title: 'Color',
      direction: 'horizontal',
      children: (
        <>
          <Icon src={goodOutlineIcon} color="green" />
          <Icon src={badOutlineIcon} color="hsl(0 60% 50%)" />
        </>
      ),
    },
    {
      title: 'Rotate',
      direction: 'horizontal',
      children: (
        <>
          <Icon src={chevronLeftIcon} rotate="90deg" />
          <Icon src={chevronLeftIcon} rotate="-0.25turn" />
        </>
      ),
    },
  ],
}))
