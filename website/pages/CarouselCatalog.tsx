import { createRoot } from 'solid-js'
import { Carousel } from '../../library/Carousel'
import { Catalog } from './ComponentCatalogPage'

export const CarouselCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Carousel itemWidth="20rem">
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: 'Changing carousel width',
      children: (
        <>
          <Carousel style={{ width: '18rem' }} itemWidth="18rem">
            <img src="https://source.unsplash.com/400x300/?dog" alt="" />
            <img src="https://source.unsplash.com/400x300/?cat" alt="" />
            <img src="https://source.unsplash.com/400x300/?sky" alt="" />
            <img src="https://source.unsplash.com/400x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/400x300/?device" alt="" />
          </Carousel>
          <Carousel style={{ width: '40%' }} itemWidth="18rem">
            <img src="https://source.unsplash.com/400x300/?dog" alt="" />
            <img src="https://source.unsplash.com/400x300/?cat" alt="" />
            <img src="https://source.unsplash.com/400x300/?sky" alt="" />
            <img src="https://source.unsplash.com/400x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/400x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
    {
      title: 'Auto scroll',
      children: (
        <>
          <Carousel style={{ width: '22rem' }} itemWidth="22rem" autoScroll>
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
          <Carousel style={{ width: '22rem' }} itemWidth="22rem" autoScroll autoScrollIntervalMs={3000}>
            <img src="https://source.unsplash.com/600x300/?dog" alt="" />
            <img src="https://source.unsplash.com/600x300/?cat" alt="" />
            <img src="https://source.unsplash.com/600x300/?sky" alt="" />
            <img src="https://source.unsplash.com/600x300/?leaf" alt="" />
            <img src="https://source.unsplash.com/600x300/?device" alt="" />
          </Carousel>
        </>
      ),
    },
  ],
}))
