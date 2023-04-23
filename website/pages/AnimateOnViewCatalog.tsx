import { createRoot } from 'solid-js'
import { AnimateOnView } from '../../library/AnimateOnView'
import { createScaleYAnimation } from '../../library/SolidDesignPartsAnimation'
import { Catalog } from './ComponentCatalogPage'

export const AnimateOnViewCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>AnimateOnView</code> is a component that performs an animation when an element is displayed on the screen.
      Being displayed on the screen is detected by IntersectionObserver.
    </>
  ),
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
