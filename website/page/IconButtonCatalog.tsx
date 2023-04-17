import { createRoot } from 'solid-js'
import { IconButton } from '../../library'
import chevronLeftIcon from './chevron-left.svg'
import chevronRightIcon from './chevron-right.svg'
import { Catalog } from './ComponentCatalogPage'

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
      title: 'Changing the icon color',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} iconColor="#F05A4D" />
          <IconButton src={chevronRightIcon} iconColor="hsl(180, 60%, 40%)" />
        </>
      ),
    },
    {
      title: 'Changing the background color',
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
      title: 'Changing the button radius',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} radius="0" backgroundColor="hsl(0 0% 90%)" />
          <IconButton src={chevronLeftIcon} radius="0.6em" backgroundColor="hsl(0 0% 90%)" />
        </>
      ),
    },
    {
      title: 'Change the button size',
      description: (
        <>
          Using <code>size</code> changes the button size. The <code>size</code> sets both the width and height.
        </>
      ),
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} size="40px" />
          <IconButton src={chevronRightIcon} size="1.5em" />
        </>
      ),
    },
    {
      title: 'Change the icon size (without changing the button size).',
      description: (
        <>
          Using <code>iconSize</code> changes the icon size, but the clickable area remains unchanged.
        </>
      ),
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} iconSize="50%" />
          <IconButton src={chevronRightIcon} iconSize="100%" />
        </>
      ),
    },
    {
      title: 'Async onClick handlers',
      description: (
        <>
          If the <code>onClick</code> handler returns a <code>Promise</code>, the button will be disabled and show a{' '}
          <code>Spinner</code> until the <code>Promise</code> is resolved.
        </>
      ),
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
