import { createRoot } from 'solid-js'
import { Stepper } from '../../library/Stepper'
import { Catalog } from './ComponentCatalogPage'

export const StepperCatalog: Catalog = createRoot(() => ({
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
}))
