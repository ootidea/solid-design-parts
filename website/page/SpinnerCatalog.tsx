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
      title: 'Changing the RPM (rotations per minute)',
      direction: 'horizontal',
      children: (
        <>
          <Spinner rpm={40} />
          <Spinner rpm={80} />
          <Spinner rpm={120} />
          <Spinner rpm={160} />
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
