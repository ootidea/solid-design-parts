import { createRoot } from 'solid-js'
import { Spinner } from '../../library/Spinner'
import { Catalog } from './ComponentCatalogPage'

export const SpinnerCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Spinner</code> is a component that indicates to the user that a process is currently in progress.
    </>
  ),
  samples: [
    {
      title: 'Basic example',
      direction: 'horizontal',
      children: (
        <>
          <Spinner />
        </>
      ),
    },
    {
      title: 'Changing the size',
      direction: 'horizontal',
      children: (
        <>
          <Spinner size="10px" />
          <Spinner size="1em" />
          <Spinner size="2rem" />
        </>
      ),
    },
    {
      title: 'Changing the frequency of rotation',
      direction: 'horizontal',
      children: (
        <>
          <Spinner frequency={0.7} />
          <Spinner frequency={1.4} />
          <Spinner frequency={2.1} />
          <Spinner frequency={2.8} />
        </>
      ),
    },
    {
      title: 'Changing the thickness',
      direction: 'horizontal',
      children: (
        <>
          <Spinner thickness={10} />
          <Spinner thickness={25} />
          <Spinner thickness={50} />
          <Spinner thickness={80} />
        </>
      ),
    },
    {
      title: 'Changing the color',
      direction: 'horizontal',
      children: (
        <>
          <Spinner color="currentColor" />
          <Spinner color="green" />
          <Spinner color="hsl(0 90% 50%)" />
        </>
      ),
    },
  ],
}))
