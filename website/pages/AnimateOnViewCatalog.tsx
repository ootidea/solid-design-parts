import { createRoot } from 'solid-js'
import { AnimateOnView } from '../../library/AnimateOnView'
import { createScaleYAnimation } from '../../library/SolidDesignPartsAnimation'
import { Catalog } from './ComponentCatalogPage'

export const AnimateOnViewCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <AnimateOnView>
            <div>Content</div>
          </AnimateOnView>
        </>
      ),
    },
    {
      title: 'Changing animation',
      children: (
        <>
          <AnimateOnView animation={createScaleYAnimation({ duration: 1400 })}>
            <div>Content</div>
          </AnimateOnView>
        </>
      ),
    },
  ],
}))
