import { createRoot } from 'solid-js'
import { Slider } from '../../src/Slider'
import { Catalog } from './ComponentCatalogPage'

export const SliderCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Slider />
          <Slider value={0.5} />
          <Slider value={1} />
        </>
      ),
    },
    {
      title: 'minValue and maxValue',
      children: (
        <>
          <Slider minValue={-1} />
          <Slider maxValue={100} value={30} />
          <Slider minValue={-2} maxValue={2} value={0} />
        </>
      ),
    },
    {
      title: 'Discrete sliders',
      description: 'Specifying stops or steps prop will make it a discrete slider.',
      children: (
        <>
          <Slider stops={[25, 50, 75]} maxValue={100} />
          <Slider step={0.1} maxValue={10} />
          <Slider step={10} offset={3} maxValue={50} />
        </>
      ),
    },
    {
      title: 'Thumb size',
      children: (
        <>
          <Slider thumbWidth="5px" value={0.2} />
          <Slider thumbWidth="1.5rem" thumbHeight="1.5rem" value={0.3} />
        </>
      ),
    },
  ],
}))
