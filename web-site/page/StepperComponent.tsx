import { Stepper } from '../../src/Stepper'
import { Catalog } from './ComponentCatalog'

export const StepperCatalog: Catalog = {
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Stepper titles={['first', 'second', 'third']} currentStep={0} />
          <Stepper titles={['first', 'second', 'third']} currentStep={1} />
          <Stepper titles={['first', 'second', 'third']} currentStep={2} />
        </>
      ),
    },
    {
      title: 'Out of range',
      children: (
        <>
          <Stepper titles={['first', 'second', 'third']} currentStep={-1} />
          <Stepper titles={['first', 'second', 'third']} currentStep={3} />
        </>
      ),
    },
  ],
}
