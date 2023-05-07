import { createRoot } from 'solid-js'
import { Stepper } from '../../library'
import { Catalog } from './ComponentCatalogPage'

export const StepperCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>Stepper</code> is a component that displays the progress in a series of steps.
    </>
  ),
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
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
