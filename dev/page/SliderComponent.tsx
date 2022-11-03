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

      <Sample title="Thumb size">
        <Slider thumbWidth="2px" />
        <Slider thumbWidth="1.5rem" thumbHeight="1.5rem" />
      </Sample>
    </article>
  )
}
