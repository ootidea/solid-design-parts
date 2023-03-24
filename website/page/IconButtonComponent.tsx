import { createRoot } from 'solid-js'
import { IconButton } from '../../src/IconButton'
import chevronLeftIcon from './chevron-left.svg'
import chevronRightIcon from './chevron-right.svg'
import { Catalog } from './ComponentCatalog'

async function awaitSomeSeconds() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

export const IconButtonCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} />
          <IconButton src={chevronRightIcon} />
        </>
      ),
    },
    {
      title: 'Icon color',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} iconColor="#F05A4D" />
          <IconButton src={chevronRightIcon} iconColor="hsl(180, 60%, 40%)" />
        </>
      ),
    },
    {
      title: 'Background color',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 90%)" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 80%)" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 50%)" iconColor="white" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 30%)" iconColor="white" />
          <IconButton
            src={chevronLeftIcon}
            backgroundColor="var(--solid-design-parts-primary-color)"
            iconColor="white"
          />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(20 80% 90%)" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(20 80% 80%)" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(20 80% 40%)" iconColor="white" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(20 80% 30%)" iconColor="white" />
        </>
      ),
    },
    {
      title: 'Button size',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} size="40px" />
          <IconButton src={chevronRightIcon} size="1.5em" />
        </>
      ),
    },
    {
      title: 'Icon size (without button size)',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} iconSize="50%" />
          <IconButton src={chevronRightIcon} iconSize="100%" />
        </>
      ),
    },
    {
      title: 'onClick function that returns a Promise',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} onClick={awaitSomeSeconds} />
          <IconButton src={chevronRightIcon} onClick={awaitSomeSeconds} />
        </>
      ),
    },
    {
      title: 'Rotate',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} rotate="90deg" />
          <IconButton src={chevronRightIcon} rotate="0.25turn" />
        </>
      ),
    },
  ],
}))
