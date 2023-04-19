import { createRoot, createSignal } from 'solid-js'
import { Slider } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal(0)

export const SliderCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Slider</code> is a component for inputting a numerical value within a certain range through intuitive
      interaction.
    </>
  ),
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
      title: 'min and max',
      children: (
        <>
          <Slider min={-1} />
          <Slider max={100} value={30} />
          <Slider min={-2} max={2} value={0} />
        </>
      ),
    },
    {
      title: 'Discrete sliders',
      description: (
        <>
          Specifying <code>stops</code> or <code>steps</code> prop will make it a discrete slider.
        </>
      ),
      children: (
        <>
          <Slider stops={[25, 50, 75]} max={100} />
          <Slider step={0.1} max={10} />
          <Slider step={10} offset={3} max={50} />
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
    {
      title: (
        <>
          Binding <code>value</code> to signal
        </>
      ),
      children: (
        <>
          <Slider value={value()} onChangeValue={setValue} />
          <div>value: {value()}</div>
        </>
      ),
    },
  ],
}))