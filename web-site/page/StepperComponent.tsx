import { Stepper } from '../../src/Stepper'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function StepperComponent() {
  return (
    <article>
      <PageTitle>Stepper</PageTitle>

      <Sample title="Basic example">
        <Stepper titles={['first', 'second', 'third']} currentStep={0} />
        <Stepper titles={['first', 'second', 'third']} currentStep={1} />
        <Stepper titles={['first', 'second', 'third']} currentStep={2} />
      </Sample>

      <Sample title="Out of range">
        <Stepper titles={['first', 'second', 'third']} currentStep={-1} />
        <Stepper titles={['first', 'second', 'third']} currentStep={3} />
      </Sample>
    </article>
  )
}
