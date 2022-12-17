import { Slider } from '../../src/Slider'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function SliderComponent() {
  return (
    <article>
      <PageTitle>Slider</PageTitle>

      <Sample title="Basic example">
        <Slider />
        <Slider value={0.5} />
        <Slider value={1} />
      </Sample>

      <Sample title="minValue and maxValue">
        <Slider minValue={-1} />
        <Slider maxValue={100} value={30} />
        <Slider minValue={-2} maxValue={2} value={0} />
      </Sample>

      <Sample title="Discrete sliders" description="Set stops or step props to be a discrete slider.">
        <Slider stops={[25, 50, 75]} maxValue={100} />
        <Slider step={0.1} maxValue={10} />
        <Slider step={10} offset={3} maxValue={50} />
      </Sample>

      <Sample title="Thumb size">
        <Slider thumbWidth="5px" value={0.2} />
        <Slider thumbWidth="1.5rem" thumbHeight="1.5rem" value={0.3} />
      </Sample>
    </article>
  )
}
